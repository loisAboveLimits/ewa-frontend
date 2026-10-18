import { LoaderMark } from "@/components/preloader/Preloader";
import styles from "@/components/preloader/Preloader.module.css";

/* Shown automatically by Next.js while a page is loading during navigation.
   The header and footer stay on screen; only the page area shows the loader. */
export default function Loading() {
  return (
    <div className={styles.routeLoader} role="status" aria-live="polite">
      <LoaderMark size={110} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
