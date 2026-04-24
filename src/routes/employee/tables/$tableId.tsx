import { createFileRoute, notFound } from "@tanstack/react-router";
import TableOrderDetailsPage from "@/components/orders/TableOrderDetailsPage";
import { getTableById } from "@/features/tables/tableStorage";

export const Route = createFileRoute("/employee/tables/$tableId")({
  loader: loadTableOrderRoute,
  component: RouteComponent,
});

function loadTableOrderRoute({ params }: { params: { tableId: string } }) {
  const tableId = Number(params.tableId);
  if (!Number.isInteger(tableId)) {
    throw notFound();
  }

  const table = getTableById(tableId);
  if (!table) {
    throw notFound();
  }

  return { table };
}

function RouteComponent() {
  const { table } = Route.useLoaderData();
  return <TableOrderDetailsPage table={table} />;
}
