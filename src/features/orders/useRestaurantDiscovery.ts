import { useEffect, useMemo, useState } from "react";
import { ORDER_RESTAURANTS } from "@/features/orders/orderData";
import type { Restaurant, RestaurantCuisine, ServiceMode } from "@/features/orders/orderTypes";

export function useRestaurantDiscovery(restaurants: Restaurant[] = ORDER_RESTAURANTS) {
  const [serviceMode, setServiceMode] = useState<ServiceMode>("delivery");
  const [query, setQuery] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<RestaurantCuisine[]>(["Asian", "Thai"]);
  const [activeRestaurantId, setActiveRestaurantId] = useState<number | null>(restaurants[0]?.id ?? null);

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesService = restaurant.service.includes(serviceMode);
      const matchesCuisine =
        selectedCuisines.length === 0 || selectedCuisines.some((cuisine) => restaurant.cuisines.includes(cuisine));
      const matchesQuery =
        normalizedQuery.length === 0 ||
        restaurant.name.toLowerCase().includes(normalizedQuery) ||
        restaurant.cuisines.join(" ").toLowerCase().includes(normalizedQuery);

      return matchesService && matchesCuisine && matchesQuery;
    });
  }, [query, restaurants, selectedCuisines, serviceMode]);

  useEffect(() => {
    if (filteredRestaurants.length === 0) {
      setActiveRestaurantId(null);
      return;
    }

    const hasActiveRestaurant = filteredRestaurants.some((restaurant) => restaurant.id === activeRestaurantId);
    if (!hasActiveRestaurant) {
      setActiveRestaurantId(filteredRestaurants[0].id);
    }
  }, [activeRestaurantId, filteredRestaurants]);

  const activeRestaurant = filteredRestaurants.find((restaurant) => restaurant.id === activeRestaurantId) ?? null;
  const hasActiveFilters = query.trim().length > 0 || selectedCuisines.length > 0 || serviceMode !== "delivery";

  function toggleCuisine(cuisine: RestaurantCuisine) {
    setSelectedCuisines((current) =>
      current.includes(cuisine) ? current.filter((item) => item !== cuisine) : [...current, cuisine]
    );
  }

  function removeCuisine(cuisine: RestaurantCuisine) {
    setSelectedCuisines((current) => current.filter((item) => item !== cuisine));
  }

  function clearFilters() {
    setQuery("");
    setServiceMode("delivery");
    setSelectedCuisines([]);
  }

  return {
    serviceMode,
    setServiceMode,
    query,
    setQuery,
    selectedCuisines,
    activeRestaurant,
    activeRestaurantId,
    setActiveRestaurantId,
    filteredRestaurants,
    hasActiveFilters,
    toggleCuisine,
    removeCuisine,
    clearFilters,
  };
}
