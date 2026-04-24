import { createFileRoute } from "@tanstack/react-router";
import EmployeesTable from "@/components/admin/employees/EmployeesTable";
import EmployeeSummary from "@/components/admin/employees/EmployeeSummary";

export const Route = createFileRoute("/admin/employees")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <EmployeeSummary />
      <EmployeesTable />
    </div>
  );
}
