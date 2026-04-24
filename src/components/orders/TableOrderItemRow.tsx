import { MessageSquareMore, X } from "lucide-react";
import QuantityStepper from "@/components/orders/QuantityStepper";
import { Button } from "@/components/ui/button";
import type { OrderLineItem } from "@/features/orders/orderTypes";

type TableOrderItemRowProps = {
  item: OrderLineItem;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onEditNote: (itemId: string) => void;
};

export default function TableOrderItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onEditNote,
}: TableOrderItemRowProps) {
  const itemTotal = item.price * item.quantity;

  function handleIncrement() {
    onIncrement(item.id);
  }

  function handleDecrement() {
    onDecrement(item.id);
  }

  function handleRemove() {
    onRemove(item.id);
  }

  function handleEditNote() {
    onEditNote(item.id);
  }

  return (
    <tr className="border-t border-text/4 bg-background">
      <td className="w-12 px-4 py-4 align-middle">
        <input type="checkbox" className="h-4 w-4 rounded border-border-color accent-dark-button" aria-label={`Select ${item.name}`} />
      </td>

      <td className="min-w-[280px] px-2 py-4 align-middle">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-12 w-12 rounded-full object-cover bg-muted ring-1 ring-text/10"
          />
          <div className="min-w-0">
            <div className="text-sm font-medium text-text sm:text-base">{item.name}</div>
            {item.note ? <div className="mt-1 truncate text-xs text-text/50">Note: {item.note}</div> : null}
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-sm font-medium text-text/85 align-middle">{formatCurrency(item.price)}</td>

      <td className="px-4 py-4 align-middle">
        <QuantityStepper quantity={item.quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
      </td>

      <td className="px-4 py-4 text-sm font-semibold text-text align-middle">{formatCurrency(itemTotal)}</td>

      <td className="w-[120px] px-4 py-4 align-middle">
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            onClick={handleEditNote}
            className="rounded-full border border-text/10 bg-background text-text/65 hover:bg-surface-soft"
            aria-label={`Comments for ${item.name}`}
          >
            <MessageSquareMore className={["h-3.5 w-3.5", item.note ? "fill-current text-text" : ""].join(" ")} />
          </Button>

          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            onClick={handleRemove}
            className="rounded-full border border-text/10 bg-background text-text/65 hover:bg-surface-soft"
            aria-label={`Remove ${item.name}`}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
