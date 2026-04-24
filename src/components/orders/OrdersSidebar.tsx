import { X } from "lucide-react";
import FiltersPopover from "@/components/filters/FiltersPopover";
import MySearch from "@/components/MySearch";
import RestaurantCard from "@/components/orders/RestaurantCard";
import { Button } from "@/components/ui/button";
import { RESTAURANT_CUISINES } from "@/features/orders/orderData";
import type { Restaurant, RestaurantCuisine, ServiceMode } from "@/features/orders/orderTypes";
import { cn } from "@/lib/utils";

type OrdersSidebarProps = {
  serviceMode: ServiceMode;
  onServiceModeChange: (value: ServiceMode) => void;
  query: string;
  onQueryChange: (value: string) => void;
  selectedCuisines: RestaurantCuisine[];
  onToggleCuisine: (cuisine: RestaurantCuisine) => void;
  onRemoveCuisine: (cuisine: RestaurantCuisine) => void;
  onClearFilters: () => void;
  restaurants: Restaurant[];
  activeRestaurantId: number | null;
  onSelectRestaurant: (id: number) => void;
  hasActiveFilters: boolean;
};

export default function OrdersSidebar({
  serviceMode,
  onServiceModeChange,
  query,
  onQueryChange,
  selectedCuisines,
  onToggleCuisine,
  onRemoveCuisine,
  onClearFilters,
  restaurants,
  activeRestaurantId,
  onSelectRestaurant,
  hasActiveFilters,
}: OrdersSidebarProps) {
  return (
    <aside className="flex flex-col border-b border-black/6 bg-[#FAFAF8] lg:border-r lg:border-b-0">
      <div className="border-b border-black/6 px-5 py-5">
        <div className="relative mb-5 flex items-center justify-between gap-3">
          <h2 className="font-bebas text-[32px] leading-none tracking-[0.12em] text-[#C8C1B8]">Best Restaurants</h2>

          <FiltersPopover
            label="Filters"
            className="static"
            panelClassName="left-0 right-0 top-[calc(100%+0.75rem)] w-auto max-w-none"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/45">Cuisine</div>

                <div className="flex flex-wrap gap-2">
                  {RESTAURANT_CUISINES.map((cuisine) => {
                    const active = selectedCuisines.includes(cuisine);

                    return (
                      <Button
                        key={cuisine}
                        type="button"
                        variant="ghost"
                        onClick={() => onToggleCuisine(cuisine)}
                        className={cn(
                          "rounded-full px-3 py-2 text-sm font-medium",
                          active ? "bg-[#F26D5B] text-white hover:bg-[#ee6553]" : "bg-[#F3F3F1] text-text hover:bg-[#ECECE8]"
                        )}
                      >
                        {cuisine}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={onClearFilters}
                className="w-full rounded-xl bg-[#F3F3F1] text-sm font-medium text-text hover:bg-[#ECECE8]"
              >
                Reset filters
              </Button>
            </div>
          </FiltersPopover>
        </div>

        <div className="inline-flex rounded-xl bg-[#F3F3F1] p-1">
          {(["delivery", "pickup"] as const).map((mode) => {
            const active = mode === serviceMode;

            return (
              <Button
                key={mode}
                type="button"
                variant="ghost"
                onClick={() => onServiceModeChange(mode)}
                className={cn(
                  "rounded-[10px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]",
                  active ? "bg-[#F5B5AA] text-[#8A483E] hover:bg-[#f3aea2]" : "text-black/45 hover:text-text"
                )}
              >
                {mode}
              </Button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCuisines.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              onClick={() => onRemoveCuisine(cuisine)}
              className="inline-flex items-center gap-2 rounded-full bg-[#F3F3F1] px-3 py-2 text-sm text-text"
            >
              <span>{cuisine}</span>
              <X className="h-3.5 w-3.5 text-black/45" />
            </button>
          ))}
        </div>

        <div className="mt-4">
          <MySearch
            value={query}
            onValueChange={onQueryChange}
            placeholder="Search cuisine or restaurant"
            className="bg-white shadow-[0_8px_20px_rgba(20,20,20,0.04)]"
          />
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              active={activeRestaurantId === restaurant.id}
              onSelect={onSelectRestaurant}
            />
          ))
        ) : (
          <div className="rounded-[22px] border border-dashed border-black/10 bg-white/80 px-5 py-8 text-center">
            <div className="text-lg font-semibold text-text">No restaurants found</div>
            <p className="mt-2 text-sm text-black/45">Try a different cuisine, service mode, or search term.</p>
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="ghost"
                onClick={onClearFilters}
                className="mt-4 rounded-xl bg-[#F3F3F1] text-text hover:bg-[#ECECE8]"
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </aside>
  );
}
