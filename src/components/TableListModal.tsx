import { useEffect, useRef } from "react";
import TableListItem from "@/components/TableListItem";
import type { TableItem } from "@/features/tables/tableTypes";

type TableListModalProps = {
  open: boolean;
  title: string;
  tables: TableItem[];
  onClose: () => void;
  onSelectTable?: (id: number) => void;
};

export default function TableListModal({ open, title, tables, onClose, onSelectTable }: TableListModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = "table-list-modal-title";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onPointerDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.target instanceof Node && panel.contains(e.target)) return;
      onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2 id={titleId} className="truncate text-base font-semibold text-text sm:text-lg">
                {title}
              </h2>
              <p className="text-sm text-text/60">{tables.length} tables</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl bg-[#F6F6F6] text-text ring-1 ring-black/5 transition hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto p-4 sm:p-6">
            <div className="flex flex-col gap-3">
              {tables.length === 0 ? (
                <div className="rounded-2xl bg-[#F6F6F6] px-4 py-10 text-center text-sm text-text/60">
                  No tables found.
                </div>
              ) : (
                tables.map((table) => (
                  <TableListItem
                    key={table.id}
                    id={table.id}
                    label={table.label}
                    status={table.status}
                    reservedTime={table.reservedTime}
                    onSelect={onSelectTable}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
