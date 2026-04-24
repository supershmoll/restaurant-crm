import { useEffect, useMemo, useRef, useState } from "react";
import { getMenuDishes, ORDER_CATEGORY_ORDER } from "@/features/orders/orderData";
import type { MenuDish, OrderCategory } from "@/features/orders/orderTypes";
import { Button } from "@/components/ui/button";

type AddDishModalProps = {
  open: boolean;
  initialCategory: OrderCategory;
  onClose: () => void;
  onAddDish: (dish: MenuDish) => void;
};

export default function AddDishModal({ open, initialCategory, onClose, onAddDish }: AddDishModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<OrderCategory>(initialCategory);
  const dishes = useMemo(() => getMenuDishes(selectedCategory), [selectedCategory]);

  useEffect(() => {
    if (!open) return;
    setSelectedCategory(initialCategory);
  }, [initialCategory, open]);

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
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-dish-title"
          className="w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <div className="border-b border-black/10 px-4 py-3 sm:px-6">
            <h2 id="add-dish-title" className="text-base font-semibold text-text sm:text-lg">
              Add dish
            </h2>
            <p className="mt-1 text-sm text-text/60">Pick a dish from the menu and add it to this table order.</p>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {ORDER_CATEGORY_ORDER.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant="outline"
                  onClick={createCategorySelectionHandler(category)}
                  className={[
                    "rounded-full px-4 text-text",
                    category === selectedCategory ? "bg-dark-button text-white hover:bg-dark-button/90" : "border-black/10",
                  ].join(" ")}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {dishes.map(renderDishCard)}
            </div>

            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={onClose} className="h-10 rounded-xl border-black/10 px-4 text-text">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderDishCard(dish: MenuDish) {
    return (
      <div key={dish.id} className="flex items-center gap-3 rounded-2xl border border-black/8 bg-[#FCFCFC] p-3">
        <img src={dish.image} alt={dish.name} className="h-14 w-14 rounded-2xl object-cover bg-gray-100 ring-1 ring-black/8" />

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-text">{dish.name}</div>
          <div className="mt-1 text-sm text-text/60">{formatCurrency(dish.price)}</div>
        </div>

        <Button
          type="button"
          onClick={createAddDishHandler(dish)}
          className="rounded-xl bg-dark-button px-4 text-white hover:bg-dark-button/90"
        >
          Add
        </Button>
      </div>
    );
  }

  function createCategorySelectionHandler(category: OrderCategory) {
    return function handleCategorySelection() {
      setSelectedCategory(category);
    };
  }

  function createAddDishHandler(dish: MenuDish) {
    return function handleDishSelection() {
      onAddDish(dish);
      onClose();
    };
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
