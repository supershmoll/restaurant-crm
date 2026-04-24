import { createFileRoute } from "@tanstack/react-router";
import OrdersDiscoveryPage from "@/components/orders/OrdersDiscoveryPage";

export const Route = createFileRoute("/employee/orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrdersDiscoveryPage />;
}
