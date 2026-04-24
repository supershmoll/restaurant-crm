import { Star } from "lucide-react";
import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import type { Restaurant } from "@/features/orders/orderTypes";
import { cn } from "@/lib/utils";

type RestaurantMapProps = {
  restaurants: Restaurant[];
  activeRestaurant: Restaurant | null;
  onSelectRestaurant: (id: number) => void;
};

const DEFAULT_CENTER: [number, number] = [40.744, -73.985];

export default function RestaurantMap({ restaurants, activeRestaurant, onSelectRestaurant }: RestaurantMapProps) {
  return (
    <div className="orders-map relative min-h-[520px] bg-[#F5F5F1] lg:min-h-full">
      <MapContainer center={DEFAULT_CENTER} zoom={13} zoomControl={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="topleft" />
        <MapViewportController restaurants={restaurants} activeRestaurant={activeRestaurant} />

        {restaurants.map((restaurant) => {
          const active = restaurant.id === activeRestaurant?.id;

          return (
            <CircleMarker
              key={restaurant.id}
              center={restaurant.coordinates}
              radius={active ? 12 : 10}
              pathOptions={{
                color: active ? "#F26D5B" : "#ffffff",
                weight: 3,
                fillColor: active ? "#F26D5B" : "#ffffff",
                fillOpacity: 1,
              }}
              eventHandlers={{ click: () => onSelectRestaurant(restaurant.id) }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -14]}
                opacity={1}
                className={cn("orders-map-tooltip", active && "is-active")}
              >
                {restaurant.name}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {activeRestaurant ? (
        <div className="pointer-events-none absolute right-4 bottom-4 left-4 z-[500] rounded-[24px] border border-black/6 bg-white/92 p-4 shadow-[0_18px_40px_rgba(20,20,20,0.10)] backdrop-blur sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-semibold text-text">{activeRestaurant.name}</div>
              <div className="mt-1 text-sm text-black/45">
                {activeRestaurant.city} • {activeRestaurant.cuisines.join(" • ")} • {activeRestaurant.price}
              </div>
            </div>

            <div className="rounded-full bg-[#F6F6F3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-black/50">
              {activeRestaurant.distanceLabel}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="rounded-full bg-[#FDF1EF] px-3 py-1.5 font-medium text-[#D05F50]">
              {activeRestaurant.service.join(" / ")}
            </span>

            <span className="inline-flex items-center gap-1 text-black/55">
              <Star className="h-3.5 w-3.5 fill-current text-[#F3B24F]" />
              {activeRestaurant.rating.toFixed(1)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MapViewportController({
  restaurants,
  activeRestaurant,
}: {
  restaurants: Restaurant[];
  activeRestaurant: Restaurant | null;
}) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  useEffect(() => {
    if (restaurants.length === 0) return;

    if (activeRestaurant) {
      map.flyTo(activeRestaurant.coordinates, 13, { duration: 0.8 });
      return;
    }

    if (restaurants.length === 1) {
      map.flyTo(restaurants[0].coordinates, 13, { duration: 0.8 });
      return;
    }

    map.fitBounds(latLngBounds(restaurants.map((restaurant) => restaurant.coordinates)), {
      padding: [64, 64],
      maxZoom: 13,
    });
  }, [activeRestaurant, map, restaurants]);

  return null;
}
