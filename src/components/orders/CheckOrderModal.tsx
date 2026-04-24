import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { OrderLineItem } from "@/features/orders/orderTypes";

type OrderSection = {
  category: string;
  items: OrderLineItem[];
};

type CheckOrderModalProps = {
  open: boolean;
  tableLabel: string;
  sections: OrderSection[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  onClose: () => void;
};

export default function CheckOrderModal({
  open,
  tableLabel,
  sections,
  subtotal,
  discountPercent,
  discountAmount,
  total,
  onClose,
}: CheckOrderModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    function handlePointerDown(event: MouseEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      if (event.target instanceof Node && panel.contains(event.target)) return;
      onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return function cleanupModal() {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-scrim backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="check-order-title"
          className="w-full max-w-3xl rounded-2xl bg-background shadow-xl ring-1 ring-text/10"
        >
          <div className="border-b border-text/10 px-4 py-3 sm:px-6">
            <h2 id="check-order-title" className="text-base font-semibold text-text sm:text-lg">
              Table {tableLabel} order
            </h2>
            <p className="mt-1 text-sm text-text/60">Review the current order before final actions.</p>
          </div>

          <div className="max-h-[70vh] space-y-5 overflow-auto p-4 sm:p-6">
            {sections.map(renderSection)}

            <div className="rounded-2xl border border-text/8 bg-surface-panel p-4">
              <div className="grid gap-2 text-sm text-text/70 sm:grid-cols-[1fr_auto]">
                <div>Subtotal</div>
                <div className="font-medium text-text">{formatCurrency(subtotal)}</div>

                <div>Discount{discountPercent > 0 ? ` (${discountPercent}%)` : ""}</div>
                <div className="font-medium text-text">{discountAmount > 0 ? `- ${formatCurrency(discountAmount)}` : formatCurrency(0)}</div>

                <div className="text-base font-semibold text-text">Final total</div>
                <div className="text-xl font-semibold text-text">{formatCurrency(total)}</div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={onClose} className="h-10 rounded-xl bg-dark-button px-5 text-white hover:bg-dark-button/90">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSection(section: OrderSection) {
    return (
      <div key={section.category} className="rounded-2xl border border-text/8 bg-surface-panel p-4">
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-text/45">{section.category}</div>
        <div className="space-y-3">
          {section.items.map(renderItem)}
        </div>
      </div>
    );
  }

  function renderItem(item: OrderLineItem) {
    return (
      <div key={item.id} className="flex items-start justify-between gap-4 rounded-xl bg-background p-3 ring-1 ring-text/5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text">{item.name}</span>
            <span className="text-sm text-text/50">x{item.quantity}</span>
          </div>
          {item.note ? <div className="mt-1 text-sm text-text/55">Note: {item.note}</div> : null}
        </div>
        <div className="text-sm font-semibold text-text">{formatCurrency(item.price * item.quantity)}</div>
      </div>
    );
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
