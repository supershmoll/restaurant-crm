import { useMemo, useState } from "react";
import MySearch from "@/components/MySearch";
import FiltersPopover from "@/components/filters/FiltersPopover";
import FilterMultiSelect from "@/components/filters/FilterMultiSelect";
import { type Employee, useEmployeesQuery } from "@/features/employees/useEmployeesQuery";

type RoleFilterValue = "all" | string;
type StatusFilterValue = "all" | "A" | "B";

function employeeStatus(employee: Employee): "A" | "B" {
  return employee.id % 2 !== 0 ? "A" : "B";
}

function EmployeesTable() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilterValue>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
  const { data, isLoading, error } = useEmployeesQuery();

  const users = (data?.users ?? []) as Employee[];
  const normalizedQuery = query.trim().toLowerCase();

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    for (const u of users) {
      const r = (u.role ?? "").toString().trim().toLowerCase();
      if (r) roles.add(r);
    }

    const base: { label: string; value: RoleFilterValue }[] = [{ label: "All roles", value: "all" }];

    const known = ["admin", "moderator", "employee"] as const;
    for (const v of known) {
      if (roles.has(v)) base.push({ label: v[0].toUpperCase() + v.slice(1), value: v });
      roles.delete(v);
    }

    const rest = Array.from(roles).sort((a, b) => a.localeCompare(b));
    for (const v of rest) {
      base.push({ label: v[0].toUpperCase() + v.slice(1), value: v });
    }

    return base;
  }, [users]);

  const statusOptions = useMemo(
    () =>
      [
        { label: "All statuses", value: "all" },
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ] as const,
    []
  );

  const filteredUsers = useMemo(() => {
    let list = users;

    if (roleFilter !== "all") {
      list = list.filter((u) => (u.role ?? "").toString().trim().toLowerCase() === roleFilter);
    }

    if (statusFilter !== "all") {
      list = list.filter((u) => employeeStatus(u) === statusFilter);
    }

    if (!normalizedQuery) return list;

    return list.filter((u) => {
      const haystack = `${u.firstName} ${u.lastName} ${u.email} ${u.role ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, roleFilter, statusFilter, users]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <div>An error occurred: {message}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center px-4 py-10 lg:px-8 lg:py-20">
      <div className="mb-4 flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FiltersPopover>
            <div className="space-y-4">
              <FilterMultiSelect
                filters={[
                  {
                    id: "role",
                    label: "Role",
                    value: roleFilter,
                    options: roleOptions,
                    onChange: setRoleFilter,
                  },
                  {
                    id: "status",
                    label: "Status",
                    value: statusFilter,
                    options: statusOptions,
                    onChange: setStatusFilter,
                  },
                ]}
              />

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setRoleFilter("all");
                    setStatusFilter("all");
                  }}
                  className="rounded-xl bg-[#F6F6F6] px-4 py-2 text-sm font-semibold text-text ring-1 ring-black/5 transition hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </FiltersPopover>

          <div className="w-full max-w-sm">
            <MySearch placeholder="Search employees…" delayMs={300} onSearch={(value) => setQuery(value)} />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border-none shadow-sm">
        <table className="min-w-200 w-full border-collapse bg-background font-sans text-left">
          <thead className="sr-only">
            <tr>
              <th>Select</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td className="px-6 py-10 text-center text-text opacity-60" colSpan={6}>
                  No employees match “{query.trim() || "—"}”.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user: Employee) => {
                const isGroupA = user.id % 2 !== 0;

                const formattedDate = new Date(user.birthDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr
                    key={user.id}
                    className="even:bg-background-secondary odd:bg-background transition-colors hover:bg-gray-50"
                  >
                    <td className="w-12 py-4 pl-6 pr-2">
                      <input
                        className="h-4 w-4 cursor-pointer rounded border-border-color accent-dark-button"
                        type="checkbox"
                      />
                    </td>

                    <td className="min-w-62.5 px-4 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="h-11 w-11 flex-none rounded-full border border-gray-200 bg-gray-100 object-cover"
                          src={user.image}
                          alt={`${user.firstName}'s profile`}
                        />
                        <div className="flex flex-col justify-center">
                          <span className="text-base leading-tight font-medium text-text">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="mt-0.5 text-sm font-normal text-text opacity-50">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                          isGroupA ? "bg-[#f5b85a]" : "bg-[#9dbdf5]"
                        }`}
                      >
                        {isGroupA ? "A" : "B"}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-normal text-text md:text-base">{formattedDate}</td>

                    <td className="px-4 py-4 text-sm font-normal text-text md:text-base">Jan 11, 2023</td>

                    <td className="py-4 pr-6 pl-4 text-right">
                      <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-light-button font-medium text-dark-button transition-colors hover:bg-gray-200">
                        +
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;
