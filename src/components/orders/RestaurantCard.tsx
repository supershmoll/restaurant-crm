import { Star } from "lucide-react";
import type { Restaurant } from "@/features/orders/orderTypes";
import { cn } from "@/lib/utils";

type RestaurantCardProps = {
  restaurant: Restaurant;
  active?: boolean;
  onSelect: (id: number) => void;
};

export default function RestaurantCard({ restaurant, active = false, onSelect }: RestaurantCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(restaurant.id)}
      className={cn(
        "w-full rounded-[22px] border bg-background p-3 text-left shadow-[0_14px_30px_var(--shadow-color-card)] transition",
        active ? "border-brand-primary/35" : "border-text/5 hover:border-text/10"
      )}
    >
      <div className="mb-3 grid grid-cols-4 gap-2">
        {restaurant.photos.map((photo, index) => (
          <FoodPhoto key={`${restaurant.id}-${index}`} src={photo} alt={`${restaurant.name} dish ${index + 1}`} />
        ))}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[22px] font-semibold leading-tight text-text">{restaurant.name}</div>
          <div className="mt-2 text-sm text-text/42">
            {restaurant.city} • {restaurant.cuisines.join(" • ")} • {restaurant.price}
          </div>
        </div>

        <div className="pt-1 text-sm font-medium text-text/35">{restaurant.distanceLabel}</div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="rounded-full bg-badge-service px-3 py-1.5 font-medium text-badge-service-foreground">
          {restaurant.service.join(" / ")}
        </span>

        <span className="inline-flex items-center gap-1 text-text/55">
          <Star className="h-3.5 w-3.5 fill-current text-rating-star" />
          {restaurant.rating.toFixed(1)}
        </span>
      </div>
    </button>
  );
}

function FoodPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} className="aspect-square w-full rounded-[14px] object-cover shadow-inner" loading="lazy" />
  );
}
