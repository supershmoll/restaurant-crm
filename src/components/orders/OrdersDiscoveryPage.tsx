import OrdersSidebar from "@/components/orders/OrdersSidebar";
import RestaurantMap from "@/components/orders/RestaurantMap";
import { useRestaurantDiscovery } from "@/features/orders/useRestaurantDiscovery";

export default function OrdersDiscoveryPage() {
  const discovery = useRestaurantDiscovery();

  return (
    <section className="mx-auto w-full max-w-[1280px]">
      <div className="overflow-hidden rounded-[30px] border border-text/8 bg-background shadow-[0_28px_70px_var(--shadow-color-floating)]">
        <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <OrdersSidebar
            serviceMode={discovery.serviceMode}
            onServiceModeChange={discovery.setServiceMode}
            query={discovery.query}
            onQueryChange={discovery.setQuery}
            selectedCuisines={discovery.selectedCuisines}
            onToggleCuisine={discovery.toggleCuisine}
            onRemoveCuisine={discovery.removeCuisine}
            onClearFilters={discovery.clearFilters}
            restaurants={discovery.filteredRestaurants}
            activeRestaurantId={discovery.activeRestaurantId}
            onSelectRestaurant={discovery.setActiveRestaurantId}
            hasActiveFilters={discovery.hasActiveFilters}
          />

          <RestaurantMap
            restaurants={discovery.filteredRestaurants}
            activeRestaurant={discovery.activeRestaurant}
            onSelectRestaurant={discovery.setActiveRestaurantId}
          />
        </div>
      </div>
    </section>
  );
}
