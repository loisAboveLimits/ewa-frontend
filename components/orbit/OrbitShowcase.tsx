"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./OrbitShowcase.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type OrbitRing = "inner" | "outer";

export interface OrbitMember {
  id: string;
  name: string;
  role?: string;
  description?: string;
  /** Local path (/team/x.jpg) or a remote URL allowed in next.config images.remotePatterns */
  image: string;
  ring: OrbitRing;
  /** Position on the ring in degrees (0 = right, 90 = bottom). Auto-spaced when omitted. */
  angle?: number;
}

export interface OrbitAction {
  id: string;
  ring: OrbitRing;
  angle: number;
  label: string;
  /** Use href when rendering from a Server Component (functions can't be passed to client components). */
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface OrbitShowcaseProps {
  members: OrbitMember[];
  actions?: OrbitAction[];
  /** Logo / content shown in the middle */
  center?: ReactNode;
  /** Seconds per full revolution */
  outerDuration?: number;
  innerDuration?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Ring config (radius is % of the stage width)                        */
/* ------------------------------------------------------------------ */

const RINGS: Record<
  OrbitRing,
  { radius: number; color: string; glow: string; direction: "normal" | "reverse"; start: number }
> = {
  outer: { radius: 44, color: "#F05A28", glow: "rgba(240, 90, 40, 0.28)", direction: "normal", start: -125 },
  inner: { radius: 28, color: "#159A9C", glow: "rgba(21, 154, 156, 0.28)", direction: "reverse", start: -10 },
};

const opposite = (d: "normal" | "reverse") => (d === "normal" ? "reverse" : "normal");

function pointOnRing(radius: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { left: `${50 + radius * Math.cos(a)}%`, top: `${50 + radius * Math.sin(a)}%` };
}

function resolveAngles(members: OrbitMember[]) {
  const out: (OrbitMember & { angle: number })[] = [];
  (Object.keys(RINGS) as OrbitRing[]).forEach((ring) => {
    const list = members.filter((m) => m.ring === ring);
    list.forEach((m, i) => {
      out.push({ ...m, angle: m.angle ?? RINGS[ring].start + (i * 360) / Math.max(list.length, 1) });
    });
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

type Active = { id: string; ring: OrbitRing; side: "left" | "right" } | null;

export default function OrbitShowcase({
  members,
  actions = [],
  center,
  outerDuration = 60,
  innerDuration = 40,
  className = "",
}: OrbitShowcaseProps) {
  const [active, setActive] = useState<Active>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef<string>("mouse");

  const open = useCallback((el: HTMLElement, m: OrbitMember) => {
    // Rotation is paused at this point, so the avatar's position is stable.
    // Open the card toward whichever side has room on screen.
    const rect = el.getBoundingClientRect();
    const cardWidth = Math.min(300, window.innerWidth * 0.72);
    const centerX = rect.left + rect.width / 2;
    const side = centerX + cardWidth > window.innerWidth - 12 ? "left" : "right";
    setActive({ id: m.id, ring: m.ring, side });
  }, []);

  const close = useCallback(() => setActive(null), []);

  // Close on outside tap / Escape (touch + keyboard users)
  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (!stageRef.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const placed = resolveAngles(members);
  const durationOf = (ring: OrbitRing) => (ring === "outer" ? outerDuration : innerDuration);

  return (
    <div
      ref={stageRef}
      className={`${styles.stage} ${className}`}
      data-paused={active ? "true" : "false"}
    >
      {/* Center logo (static) */}
      {center && <div className={styles.center}>{center}</div>}

      {(["outer", "inner"] as OrbitRing[]).map((ring) => {
        const cfg = RINGS[ring];
        const duration = durationOf(ring);
        const ringVars = {
          "--duration": `${duration}s`,
          animationDirection: cfg.direction,
          zIndex: active?.ring === ring ? 30 : ring === "inner" ? 20 : 10,
        } as CSSProperties;
        // Items spin the opposite way at the same speed so they stay upright.
        const uprightVars = {
          "--duration": `${duration}s`,
          animationDirection: opposite(cfg.direction),
        } as CSSProperties;

        return (
          <div key={ring} className={`${styles.layer} ${styles.anim}`} style={ringVars}>
            <div
              className={styles.ring}
              style={
                {
                  "--size": `${cfg.radius * 2}%`,
                  "--ring-color": cfg.color,
                  "--ring-glow": cfg.glow,
                } as CSSProperties
              }
            />

            {/* Avatars */}
            {placed
              .filter((m) => m.ring === ring)
              .map((m) => {
                const isOpen = active?.id === m.id;
                return (
                  <div
                    key={m.id}
                    className={`${styles.slot} ${styles.avatarSlot}`}
                    style={{ ...pointOnRing(cfg.radius, m.angle), zIndex: isOpen ? 10 : 1 }}
                  >
                    <div
                      className={`${styles.upright} ${styles.anim}`}
                      style={uprightVars}
                      onPointerEnter={(e) => {
                        pointerType.current = e.pointerType;
                        if (e.pointerType === "mouse") open(e.currentTarget, m);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "mouse") close();
                      }}
                    >
                      <button
                        type="button"
                        aria-label={`${m.name}${m.role ? `, ${m.role}` : ""}`}
                        aria-expanded={isOpen}
                        className={styles.avatar}
                        style={{ "--ring-color": cfg.color } as CSSProperties}
                        onPointerDown={(e) => (pointerType.current = e.pointerType)}
                        onClick={(e) => {
                          if (pointerType.current === "mouse") return; // hover already handles mouse
                          isOpen ? close() : open(e.currentTarget.parentElement!, m);
                        }}
                        onFocus={(e) => {
                          if (e.currentTarget.matches(":focus-visible")) open(e.currentTarget.parentElement!, m);
                        }}
                        onBlur={close}
                      >
                        <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 64px, 96px" className={styles.avatarImg} />
                      </button>

                      <div
                        role="tooltip"
                        aria-hidden={!isOpen}
                        className={[
                          styles.card,
                          isOpen && active?.side === "left" ? styles.cardLeft : styles.cardRight,
                          isOpen ? styles.cardOpen : "",
                        ].join(" ")}
                      >
                        <div className={styles.cardText}>
                          <p className={styles.name}>{m.name}</p>
                          {m.role && <p className={styles.role}>{m.role}</p>}
                          {m.description && <p className={styles.desc}>“{m.description}”</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Plus / action buttons */}
            {actions
              .filter((a) => a.ring === ring)
              .map((a) => {
                const content = a.icon ?? <PlusIcon />;
                const common = {
                  className: styles.action,
                  "aria-label": a.label,
                  style: { "--ring-color": cfg.color } as CSSProperties,
                };
                return (
                  <div key={a.id} className={`${styles.slot} ${styles.actionSlot}`} style={pointOnRing(cfg.radius, a.angle)}>
                    <div className={`${styles.upright} ${styles.anim}`} style={uprightVars}>
                      {a.href ? (
                        <Link href={a.href} {...common}>{content}</Link>
                      ) : (
                        <button type="button" onClick={a.onClick} {...common}>{content}</button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40%" height="40%" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
