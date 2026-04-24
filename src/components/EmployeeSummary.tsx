import StatCard from "./StatCard";
import { type Employee, useEmployeesQuery } from "../features/employees/useEmployeesQuery";
import EmployeeListModal from "@/components/EmployeeListModal";
import { useFilterModal } from "@/hooks/useFilterModal";

type ModalKind = "all" | "admins" | "moderators";

function roleOf(role?: string) {
  return (role ?? "").trim().toLowerCase();
}

function isAdmin(user: Employee) {
  return roleOf(user.role) === "admin";
}

function isModerator(user: Employee) {
  return roleOf(user.role) === "moderator";
}

const EMPLOYEE_MODAL_CONFIG = {
  all: { title: "All Employees" },
  admins: { title: "Admins", predicate: isAdmin },
  moderators: { title: "Moderators", predicate: isModerator },
} satisfies Record<ModalKind, { title: string; predicate?: (user: Employee) => boolean }>;

function EmployeeSummary() {
  const { data } = useEmployeesQuery();
  const users = data?.users ?? [];

  const admins = users.filter(isAdmin).length;
  const moderators = users.filter(isModerator).length;

  const employeeModal = useFilterModal<Employee, ModalKind>({
    items: users,
    config: EMPLOYEE_MODAL_CONFIG,
    initialKind: "all" satisfies ModalKind,
  });

  function handleEmployeeModalOpen(kind: ModalKind) {
    employeeModal.openModal(kind);
  }

  return (
    <>
      <div className="flex w-full flex-col items-center px-4 pt-10 lg:px-8 lg:pt-20">
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              title="All Employees"
              value={users.length}
              viewValue="all"
              onView={handleEmployeeModalOpen}
            />
            <StatCard
              title="Admins"
              value={admins}
              viewValue="admins"
              onView={handleEmployeeModalOpen}
            />
            <StatCard
              title="Moderators"
              value={moderators}
              viewValue="moderators"
              onView={handleEmployeeModalOpen}
            />
          </div>
        </div>
      </div>

      <EmployeeListModal
        open={employeeModal.open}
        title={employeeModal.title}
        employees={employeeModal.items}
        onClose={employeeModal.closeModal}
      />
    </>
  );
}

export default EmployeeSummary;