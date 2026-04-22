import StatCard from "./StatCard";
import { useEmployeesQuery } from "../features/employees/useEmployeesQuery";
function EmployeeSummary() {
  const { data } = useEmployeesQuery();
  const users = data?.users ?? [];

  const roleOf = (role?: string) => (role ?? "").trim().toLowerCase();
  const admins = users.filter((u) => roleOf(u.role) === "admin").length;
  const moderators = users.filter((u) => roleOf(u.role) === "moderator").length;

  return (
    <div className="flex w-full flex-col items-center px-4 pt-10 lg:px-8 lg:pt-20">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard title="All Employees" value={users.length} />
          <StatCard title="Admins" value={admins} />
          <StatCard title="Moderators" value={moderators} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeSummary;