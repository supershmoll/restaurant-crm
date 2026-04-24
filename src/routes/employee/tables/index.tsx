import { createFileRoute } from "@tanstack/react-router";
import TablesOverviewPage from "@/components/tables/TablesOverviewPage";

export const Route = createFileRoute("/employee/tables/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TablesOverviewPage />;
}
