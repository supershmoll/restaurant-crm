import { useMemo, useState } from "react";
import MySearch from "@/components/MySearch";
import { type Employee, useEmployeesQuery } from "@/features/employees/useEmployeesQuery";

function EmployeesTable() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useEmployeesQuery();

  const users = (data?.users ?? []) as Employee[];
  const normalizedQuery = query.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) return users;

    return users.filter((u) => {
      const haystack = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, users]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <div>An error occurred: {message}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-10 lg:px-8 lg:py-20">
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between gap-3">
        <div className="w-full max-w-sm">
          <MySearch
            placeholder="Search employees…"
            delayMs={300}
            onSearch={(value) => setQuery(value)}
          />
        </div>
        <div className="text-sm text-text opacity-60 whitespace-nowrap">
          {filteredUsers.length} / {users.length}
        </div>
      </div>

      <div className="w-full max-w-5xl rounded-2xl overflow-x-auto shadow-sm border-none">
        <table className="w-full min-w-200 font-sans text-left border-collapse bg-background">
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
                <td className="py-10 px-6 text-center text-text opacity-60" colSpan={6}>
                  No employees match “{query.trim() || "—"}”.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user: Employee) => {
              const isGroupA = user.id % 2 !== 0;

              const formattedDate = new Date(user.birthDate).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );

              return (
                <tr
                  key={user.id}
                  className="even:bg-background-secondary odd:bg-background hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-6 pr-2 w-12">
                    <input
                      className="w-4 h-4 rounded border-border-color cursor-pointer accent-dark-button"
                      type="checkbox"
                    />
                  </td>

                  <td className="py-4 px-4 min-w-62.5">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-11 h-11 rounded-full object-cover bg-gray-100 border border-gray-200 flex-none"
                        src={user.image}
                        alt={`${user.firstName}'s profile`}
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-base font-medium text-text leading-tight">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-sm font-normal text-text opacity-50 mt-0.5">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        isGroupA ? "bg-[#f5b85a]" : "bg-[#9dbdf5]"
                      }`}
                    >
                      {isGroupA ? "A" : "B"}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-text font-normal text-sm md:text-base">
                    {formattedDate}
                  </td>

                  <td className="py-4 px-4 text-text font-normal text-sm md:text-base">
                    Jan 11, 2023
                  </td>

                  <td className="py-4 pr-6 pl-4 text-right">
                    <button className="w-8 h-8 rounded-full bg-light-button hover:bg-gray-200 text-dark-button flex items-center justify-center ml-auto transition-colors font-medium">
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
