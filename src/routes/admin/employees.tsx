
import { createFileRoute } from "@tanstack/react-router";
import EmployeesTable from "@/components/EmployeesTable";
import EmployeeSummary from "@/components/EmployeeSummary";
import EmployeesHeader from "@/components/EmployeesHeader";

export const Route = createFileRoute("/admin/employees")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-6xl">
    <EmployeesHeader />
    <EmployeeSummary />
    <EmployeesTable />
    </div>
  );
}
