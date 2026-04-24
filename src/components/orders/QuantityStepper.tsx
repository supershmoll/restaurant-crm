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
        className="rounded-full bg-[#F5F5F5] text-text hover:bg-[#ECECEC]"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <span className="grid min-w-8 place-items-center rounded-full bg-white px-2 py-1 text-sm font-semibold text-text ring-1 ring-black/5">
        {quantity}
      </span>

      <Button
        type="button"
        size="icon-xs"
        variant="secondary"
        onClick={onIncrement}
        className="rounded-full bg-[#F5F5F5] text-text hover:bg-[#ECECEC]"
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
