import type { ReactNode } from "react";
import SectionTitle from "@/components/ui/SectionTitle";

/* Building blocks for the policy panels (used by lib/rules.tsx in both languages). */

export function PolicyTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="spacer-40"></div>
      <SectionTitle color="fnt-orange">{children}</SectionTitle>
      <div className="spacer-20"></div>
    </>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="fnt-orange font-bold text-[22px] md:text-[30px]">{children}</h3>;
}

export function Gap({ size = 40 }: { size?: 20 | 40 }) {
  return <div className={`spacer-${size}`}></div>;
}

/** Light-green card with the leaf watermark in the bottom inline-end corner. */
export function LeafBox({ children }: { children: ReactNode }) {
  return (
    <div className="box-leaf-green py-6 px-5 md:py-8 md:px-10 bg-[url(/imgs/assets/box-leaf-bg.svg)] bg-no-repeat bg-right-bottom rtl:bg-left-bottom">
      <div className="md:w-[80%] fnt-green">{children}</div>
    </div>
  );
}

/** Orange outlined note with an asterisk; text sits on the inline-end side like the design. */
export function NoteBox({ children }: { children: ReactNode }) {
  return (
    <div className="box-leaf-orange py-6 px-5 md:py-8 md:px-10 bg-[url(/imgs/assets/box-leaf-orange-bg.svg)] bg-no-repeat bg-left-bottom rtl:bg-right-bottom">
      <div className="md:ms-[20%] md:w-[80%] fnt-orange">
        <p>
          <i className="fa-solid fa-asterisk mar-right-5"></i> {children}
        </p>
      </div>
    </div>
  );
}

export function Bullets({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <ul className={`list-disc ps-6 ${className}`}>{children}</ul>;
}

export function Numbered({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <ol className={`list-decimal ps-6 ${className}`}>{children}</ol>;
}
