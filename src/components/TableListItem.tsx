import { getTableStatusMeta, type TableStatus } from "@/components/tableStatus";

type TableListItemProps = {
  id: number;
  label: string;
  status: TableStatus;
  reservedTime?: string;
  onSelect?: (id: number) => void;
  className?: string;
};

export default function TableListItem({ id, label, status, reservedTime, onSelect, className }: TableListItemProps) {
  const statusMeta = getTableStatusMeta(status);

  function handleClick() {
    onSelect?.(id);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl border border-border-color/60 px-4 py-3 text-left shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-transform active:scale-[0.99]",
        statusMeta.surfaceClassName,
        className ?? "",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 text-sm font-semibold text-text ring-1 ring-black/5">
          {label}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text">Table {label}</span>
            <span
              className={[
                "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold leading-none",
                statusMeta.badgeClassName,
              ].join(" ")}
            >
              {statusMeta.text}
            </span>
          </div>

          <div className="mt-1 text-sm text-text/60">
            {status === "reserved" && reservedTime ? `Reserved for ${reservedTime}` : "Open table details"}
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="text-lg text-text/60">
        →
      </span>
    </button>
  );
}

export type { TableListItemProps };
