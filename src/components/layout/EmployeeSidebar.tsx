import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { clearAuth } from "@/features/auth/authUtils";
import drink_light from "/images/drink_light.svg";
import Desk_alt_light from "/images/Desk_alt_light.svg";
import pie_chart_light from "/images/pie_chart_light.svg";

function EmployeeSidebar() {
  const navigate = useNavigate();

  const storageKey = "employeeSidebarCollapsed";
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

  const navLinks = useMemo(
    () =>
      [
        { to: "/employee/tables", label: "Tables", icon: drink_light, alt: "Drink" },
        { to: "/employee/orders", label: "Orders", icon: Desk_alt_light, alt: "Desk" },
        { to: "/employee/statistics", label: "Statistics", icon: pie_chart_light, alt: "Pie" },
      ] as const,
    []
  );

  const handleLogout = () => {
    clearAuth();
    navigate({ to: "/login" });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={[
          "hidden md:flex h-screen flex-col gap-6 bg-dark-background p-4 text-white",
          "transition-[width] duration-200",
          collapsed ? "w-20" : "w-65",
        ].join(" ")}
      >
        <div className={["flex items-center", collapsed ? "justify-center" : "justify-between"].join(" ")}>
          <h2 className={collapsed ? "sr-only" : "font-bebas text-2xl text-center"}>Restaurant CRM</h2>

          <button
            type="button"
            onClick={toggleCollapsed}
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-background/10 transition-colors"
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
                "w-full rounded-lg p-3 transition-colors",
                "flex items-center gap-3",
                "hover:bg-background/10",
                collapsed ? "justify-center" : "",
              ].join(" ")}
              activeProps={{
                className: "bg-background/10",
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

export default EmployeeSidebar;
