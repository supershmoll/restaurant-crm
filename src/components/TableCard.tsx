import { getTableStatusMeta, type TableStatus } from "@/components/tableStatus";

type TableCardProps = {
  id: number;
  label: string; 
  status: TableStatus;
  
  reservedTime?: string;
  onSelect?: (id: number) => void;
  className?: string;
};

export default function TableCard({ id, label, status, reservedTime, onSelect, className }: TableCardProps) {
  const statusMeta = getTableStatusMeta(status);

  function handleClick() {
    onSelect?.(id);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "relative h-[120px] w-[115px] rounded-2xl border border-border-color/60",
        "shadow-[0_1px_0_rgba(0,0,0,0.02)]",
        "transition-transform hover:-translate-y-0.5 active:scale-[0.99]",
        "text-left",
        statusMeta.surfaceClassName,
        className ?? "",
      ].join(" ")}
    >
      <div className="absolute left-3 top-3 text-sm font-semibold text-text">{label}</div>

      <div className="absolute right-3 top-3">
        <span
          className={[
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold leading-none",
            statusMeta.badgeClassName,
          ].join(" ")}
        >
          {statusMeta.text}
        </span>
      </div>

      {status === "reserved" && reservedTime ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm font-semibold text-text">{reservedTime}</div>
        </div>
      ) : null}

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
        <span className="text-lg text-text/70">→</span>
      </div>
    </button>
  );
}

export type { TableStatus, TableCardProps };

