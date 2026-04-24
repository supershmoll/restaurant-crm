import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type OrderDiscountModalProps = {
  open: boolean;
  initialPercent: number;
  onClose: () => void;
  onSave: (percent: number) => void;
};

const DISCOUNT_PRESETS = [0, 5, 10, 15, 20] as const;

export default function OrderDiscountModal({
  open,
  initialPercent,
  onClose,
  onSave,
}: OrderDiscountModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [percent, setPercent] = useState(String(initialPercent));

  useEffect(() => {
    if (!open) return;
    setPercent(String(initialPercent));
  }, [initialPercent, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(parseDiscountPercent(percent));
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-scrim backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-discount-title"
          className="w-full max-w-md rounded-2xl bg-background shadow-xl ring-1 ring-text/10"
        >
          <form onSubmit={handleSubmit}>
            <div className="border-b border-text/10 px-4 py-3 sm:px-6">
              <h2 id="order-discount-title" className="text-base font-semibold text-text sm:text-lg">
                Order discount
              </h2>
              <p className="mt-1 text-sm text-text/60">Apply a percentage discount to the whole table order.</p>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {DISCOUNT_PRESETS.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant="outline"
                    onClick={createPresetHandler(preset)}
                    className="rounded-full border-text/10 px-4 text-text"
                  >
                    {preset}%
                  </Button>
                ))}
              </div>

              <label className="block">
                <div className="mb-1 text-sm font-medium text-text">Discount percent</div>
                <input
                  ref={inputRef}
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={percent}
                  onChange={handlePercentChange}
                  className="h-11 w-full rounded-xl bg-background px-3 text-sm text-text ring-1 ring-text/10 outline-none transition focus-visible:ring-2 focus-visible:ring-text/15"
                />
              </label>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={onClose} className="h-10 rounded-xl border-text/10 px-4 text-text">
                  Cancel
                </Button>
                <Button type="submit" className="h-10 rounded-xl bg-dark-button px-4 text-white hover:bg-dark-button/90">
                  Apply discount
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function handlePercentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPercent(event.target.value);
  }

  function createPresetHandler(preset: number) {
    return function handlePresetSelection() {
      setPercent(String(preset));
    };
  }
}

function parseDiscountPercent(value: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(100, Math.max(0, parsed));
}
