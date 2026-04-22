import StatCard from "./StatCard";
import { useEmployeesQuery } from "../features/employees/useEmployeesQuery";
import { useMemo, useState } from "react";
import EmployeeListModal from "@/components/EmployeeListModal";
function EmployeeSummary() {
  const { data } = useEmployeesQuery();
  const users = data?.users ?? [];

  const roleOf = (role?: string) => (role ?? "").trim().toLowerCase();
  const admins = users.filter((u) => roleOf(u.role) === "admin").length;
  const moderators = users.filter((u) => roleOf(u.role) === "moderator").length;

  type ModalKind = "all" | "admins" | "moderators";
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState<ModalKind>("all");

  const modalTitle = useMemo(() => {
    switch (modalKind) {
      case "admins":
        return "Admins";
      case "moderators":
        return "Moderators";
      default:
        return "All Employees";
    }
  }, [modalKind]);

  const modalEmployees = useMemo(() => {
    if (modalKind === "admins") return users.filter((u) => roleOf(u.role) === "admin");
    if (modalKind === "moderators") return users.filter((u) => roleOf(u.role) === "moderator");
    return users;
  }, [modalKind, users]);

  return (
    <>
      <div className="flex w-full flex-col items-center px-4 pt-10 lg:px-8 lg:pt-20">
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              title="All Employees"
              value={users.length}
              onView={() => {
                setModalKind("all");
                setModalOpen(true);
              }}
            />
            <StatCard
              title="Admins"
              value={admins}
              onView={() => {
                setModalKind("admins");
                setModalOpen(true);
              }}
            />
            <StatCard
              title="Moderators"
              value={moderators}
              onView={() => {
                setModalKind("moderators");
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <EmployeeListModal
        open={modalOpen}
        title={modalTitle}
        employees={modalEmployees}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default EmployeeSummary;