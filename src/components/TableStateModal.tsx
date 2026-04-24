import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import type { TableStatus } from "@/components/tableStatus";
import { Button } from "@/components/ui/button";

type TableStateModalProps = {
  open: boolean;
  tableId: number;
  tableLabel: string;
  status: TableStatus;
  reservedTime?: string;
  onClose: () => void;
  onSave: (next: { status: TableStatus; reservedTime?: string }) => void;
};

const STATUS_OPTIONS: { id: TableStatus; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "occupied", label: "Occupied" },
  { id: "reserved", label: "Reserved" },
];

export default function TableStateModal({
  open,
  tableId,
  tableLabel,
  status,
  reservedTime,
  onClose,
  onSave,
}: TableStateModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const reservedInputRef = useRef<HTMLInputElement | null>(null);
  const titleId = `table-state-modal-title-${tableId}`;

  const [nextStatus, setNextStatus] = useState<TableStatus>(status);
  const [nextReservedTime, setNextReservedTime] = useState(reservedTime ?? "");

  useEffect(() => {
    if (!open) return;
    setNextStatus(status);
    setNextReservedTime(reservedTime ?? "");
  }, [open, reservedTime, status]);

  useEffect(() => {
    if (!open) return;
    if (nextStatus !== "reserved") return;
    reservedInputRef.current?.focus();
  }, [nextStatus, open]);

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

  const canSave = nextStatus !== "reserved" || nextReservedTime.trim().length > 0;

  function handleFormKeyDown(e: ReactKeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLElement | null;
    if (target && target.tagName === "TEXTAREA") return;

    e.preventDefault();
    formRef.current?.requestSubmit();
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSave) return;

    onSave({
      status: nextStatus,
      reservedTime: nextStatus === "reserved" ? nextReservedTime.trim() : undefined,
    });
    onClose();
  }

  function handleReservedTimeChange(e: ChangeEvent<HTMLInputElement>) {
    setNextReservedTime(e.target.value);
  }

  function handleStatusChange(nextValue: TableStatus) {
    setNextStatus(nextValue);
  }

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
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2 id={titleId} className="truncate text-base font-semibold text-text sm:text-lg">
                Table {tableLabel}
              </h2>
              <p className="text-sm text-text/60">Change state</p>
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

          <form
            ref={formRef}
            className="space-y-4 p-4 sm:p-6"
            onKeyDown={handleFormKeyDown}
            onSubmit={handleFormSubmit}
          >
            <div className="grid grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const active = opt.id === nextStatus;
                return (
                  <StatusOptionButton
                    key={opt.id}
                    optionId={opt.id}
                    label={opt.label}
                    active={active}
                    onSelect={handleStatusChange}
                  />
                );
              })}
            </div>

            {nextStatus === "reserved" ? (
              <label className="block">
                <div className="mb-1 text-sm font-medium text-text">Reserved time</div>
                <input
                  ref={reservedInputRef}
                  value={nextReservedTime}
                  onChange={handleReservedTimeChange}
                  placeholder="e.g. 18:00"
                  className="h-10 w-full rounded-xl bg-white px-3 text-sm text-text ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                />
                <div className="mt-2 text-xs text-text/60">Enter to confirm, Esc to discard.</div>
              </label>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="submit"
                disabled={!canSave}
                className="h-10 rounded-xl bg-dark-button px-4 text-sm font-semibold text-white ring-1 ring-black/10 transition hover:bg-dark-button/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save
              </button>
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-black/10 px-4 text-sm font-semibold text-text"
              >
                <Link to="/employee/tables/$tableId" params={{ tableId: String(tableId) }} onClick={onClose}>
                  View Order
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type StatusOptionButtonProps = {
  optionId: TableStatus;
  label: string;
  active: boolean;
  onSelect: (status: TableStatus) => void;
};

function StatusOptionButton({ optionId, label, active, onSelect }: StatusOptionButtonProps) {
  function handleClick() {
    onSelect(optionId);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "h-10 rounded-xl px-3 text-sm font-semibold ring-1 ring-black/10 transition",
        active ? "bg-dark-button text-white ring-black/10" : "bg-white text-text hover:bg-[#F6F6F6]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

