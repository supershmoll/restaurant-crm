
import { createFileRoute } from "@tanstack/react-router";
import EmployeesTable from "@/components/EmployeesTable";
import EmployeeSummary from "@/components/EmployeeSummary";
export const Route = createFileRoute('/admin/employees')({
  component: RouteComponent,
});

function RouteComponent() {
  return (<div>
    <EmployeeSummary />
    <EmployeesTable />
  </div>
  );
}
