import { getUser } from "@/features/auth/authUtils";
type EmployeesHeaderProps = {
  title?: string;
};

export default function EmployeesHeader({ title = "Employees" }: EmployeesHeaderProps) {
  const user = getUser();
  const name = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";

  return (
    <header className="mb-4 flex items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-text">{title}</h1>
      <div className="flex items-center gap-3">
          <img src="/Bell_pin_light.svg" alt="Bell" />
        <div className="flex items-center gap-2">
            <img src="/User_light.svg" alt="User" />
          <div className="min-w-0">
            <div
              className="font-inter text-[16px] font-medium leading-[16px] tracking-normal text-right text-text truncate"
              title={name || undefined}
            >
              {name || "—"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

