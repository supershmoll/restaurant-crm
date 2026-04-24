import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { clearAuth } from "@/features/auth/authUtils";
import Home_light from "/images/Home_light.svg";
import Calendar_light from "/images/Calendar_light.svg";
import Wallet_alt_light from "/images/Wallet_alt_light.svg";
import Subttasks_light from "/images/Subttasks_light.svg";
import Line_up_light from "/images/Line_up_light.svg";
import Group_light from "/images/Group_light.svg";
import suitcase_light from "/images/suitcase_light.svg";

function AdminSidebar() {
  const navigate = useNavigate();
  const storageKey = "adminSidebarCollapsed";
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw === "1") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(storageKey, next ? "1" : "0");
      return next;
    });
  };

  const handleLogout = () => {
    clearAuth();
    navigate({ to: "/login" });
  };

  const navLinks = useMemo(
    () =>
      [
        { to: "/", label: "Home", icon: Home_light, alt: "Home" },
        { to: "/admin/shift", label: "Shift", icon: Calendar_light, alt: "Calendar" },
        { to: "/admin/payroll", label: "Payroll", icon: Wallet_alt_light, alt: "Payroll" },
        { to: "/admin/tasks", label: "Tasks", icon: Subttasks_light, alt: "Tasks" },
        { to: "/admin/analytics", label: "Analytics", icon: Line_up_light, alt: "Analytics" },
        { to: "/admin/employees", label: "Employees", icon: Group_light, alt: "Employees" },
        { to: "/admin/vacation", label: "Vacation", icon: suitcase_light, alt: "Vacation" },
      ] as const,
    []
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={[
          "hidden md:flex h-screen flex-col gap-6 bg-background-secondary p-4",
          "transition-[width] duration-200",
          collapsed ? "w-20" : "w-65",
        ].join(" ")}
      >
        <div className={["flex items-center", collapsed ? "justify-center" : "justify-between"].join(" ")}>
          <h2 className={collapsed ? "sr-only" : "font-bebas text-2xl"}>Restaurant CRM</h2>

          <button
            type="button"
            onClick={toggleCollapsed}
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-background-primary transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <hr className="border-0.25 border-border-color" />

        <nav className="flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "w-full rounded-lg p-3 transition-colors hover:bg-background-primary",
                "flex items-center gap-3",
                collapsed ? "justify-center" : "",
              ].join(" ")}
              activeProps={{
                className: "bg-background-primary",
              }}
            >
              <img src={item.icon} alt={item.alt} className="h-6 w-6 shrink-0" />
              <span className={collapsed ? "hidden" : "block"}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className={[
            "mt-auto w-full rounded-lg p-3 text-start transition-colors hover:bg-destructive/10 text-destructive",
            "flex items-center gap-3",
            collapsed ? "justify-center" : "",
          ].join(" ")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
          <span className={collapsed ? "hidden" : "block"}>Logout</span>
        </button>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-text/10 bg-background/90 backdrop-blur">
        <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-1 items-center justify-center py-3 opacity-60 transition-opacity"
              activeProps={{ className: "opacity-100" }}
            >
              <img src={item.icon} alt={item.alt} className="h-6 w-6" />
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default AdminSidebar;
