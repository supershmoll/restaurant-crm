import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function QuantityStepper({ quantity, onIncrement, onDecrement }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Button
        type="button"
        size="icon-xs"
        variant="secondary"
        onClick={onDecrement}
        className="rounded-full bg-surface-soft text-text hover:bg-surface-soft-hover"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <span className="grid min-w-8 place-items-center rounded-full bg-background px-2 py-1 text-sm font-semibold text-text ring-1 ring-text/5">
        {quantity}
      </span>

      <Button
        type="button"
        size="icon-xs"
        variant="secondary"
        onClick={onIncrement}
        className="rounded-full bg-surface-soft text-text hover:bg-surface-soft-hover"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
