import { useEffect, useId, useRef, useState } from "react";

type FiltersPopoverProps = {
  label?: string;
  children: React.ReactNode;
};

export default function FiltersPopover({ label = "Filters", children }: FiltersPopoverProps) {
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
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F6F6F6] px-4 text-sm font-medium text-text ring-1 ring-black/5 transition hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black/60"
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
          className="absolute left-0 top-12 z-50 w-80 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/10"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

