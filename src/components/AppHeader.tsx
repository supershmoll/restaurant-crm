import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getUser } from "@/features/auth/authUtils";

type AppHeaderProps = {
  
  title?: string;
};

function titleFromPath(pathname: string): string {
  if (pathname === "/") return "Home";


  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/analytics")) return "Analytics";
    if (pathname.startsWith("/admin/employees")) return "Employees";
    if (pathname.startsWith("/admin/shift")) return "Shift";
    if (pathname.startsWith("/admin/payroll")) return "Payroll";
    if (pathname.startsWith("/admin/tasks")) return "Tasks";
    if (pathname.startsWith("/admin/vacation")) return "Vacation";
    return "Admin";
  }

  if (pathname.startsWith("/employee")) {
    if (pathname.startsWith("/employee/tables")) return "Tables";
    if (pathname.startsWith("/employee/orders")) return "Orders";
    if (pathname.startsWith("/employee/statistics")) return "Statistics";
    return "Employee";
  }

  if (pathname.startsWith("/login")) return "Login";
  return "";
}

export default function AppHeader({ title }: AppHeaderProps) {
  const { location } = useRouterState();
  const computedTitle = useMemo(() => titleFromPath(location.pathname), [location.pathname]);
  const headerTitle = title ?? computedTitle;

  const user = getUser();
  const name = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";

  return (
    <header className="mb-4 flex items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-text">{headerTitle}</h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full bg-background-secondary ring-1 ring-black/5 hover:bg-background-primary"
          aria-label="Notifications"
        >
          <img src="/Bell_pin_light.svg" alt="" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-background-secondary ring-1 ring-black/5">
            <img src="/User_light.svg" alt="" className="h-5 w-5" />
          </div>

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

