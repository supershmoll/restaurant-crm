import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FiltersPopoverProps = {
  label?: string;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
};

export default function FiltersPopover({
  label = "Filters",
  children,
  className,
  buttonClassName,
  panelClassName,
}: FiltersPopoverProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-flex flex-col items-end", className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl bg-surface-muted px-4 text-sm font-medium text-text ring-1 ring-text/5 transition hover:bg-surface-muted-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-text/15",
          buttonClassName
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-text/60"
        >
          <path
            d="M3 5h18l-7 8v5l-4 2v-7L3 5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`${label} panel`}
          className={cn(
            "absolute top-12 right-0 z-50 w-[min(20rem,calc(100vw-3rem))] rounded-2xl bg-background p-4 shadow-lg ring-1 ring-text/10",
            panelClassName
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

