import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/employee/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}