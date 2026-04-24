import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { clearAuth } from "@/features/auth/authUtils";

export type SidebarLink = {
  to: string;
  label: string;
  icon: string;
  alt: string;
};

type AppSidebarProps = {
  storageKey: string;
  links: SidebarLink[];
  tone: "light" | "dark";
};

const DESKTOP_SIDEBAR_CLASSES = {
  light: "bg-background-secondary text-text",
  dark: "bg-dark-background text-white",
} as const;

const ITEM_STATE_CLASSES = {
  light: {
    hover: "hover:bg-background-primary",
    active: "bg-background-primary",
  },
  dark: {
    hover: "hover:bg-background/10",
    active: "bg-background/10",
  },
} as const;

export default function AppSidebar({ storageKey, links, tone }: AppSidebarProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const itemStateClasses = ITEM_STATE_CLASSES[tone];

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw === "1") setCollapsed(true);
  }, [storageKey]);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(storageKey, next ? "1" : "0");
      return next;
    });
  }

  function handleLogout() {
    clearAuth();
    navigate({ to: "/login" });
  }

  return (
    <>
      <aside
        className={[
          "hidden h-screen flex-col gap-6 p-4 transition-[width] duration-200 md:flex",
          DESKTOP_SIDEBAR_CLASSES[tone],
          collapsed ? "w-20" : "w-65",
        ].join(" ")}
      >
        <div className={["flex items-center", collapsed ? "justify-center" : "justify-between"].join(" ")}>
          <h2 className={collapsed ? "sr-only" : "font-bebas text-2xl"}>Restaurant CRM</h2>

          <button
            type="button"
            onClick={toggleCollapsed}
            className={["grid h-10 w-10 place-items-center rounded-lg transition-colors", itemStateClasses.hover].join(" ")}
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
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
                itemStateClasses.hover,
                collapsed ? "justify-center" : "",
              ].join(" ")}
              activeProps={{
                className: itemStateClasses.active,
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
            "mt-auto flex w-full items-center gap-3 rounded-lg p-3 text-start text-destructive transition-colors hover:bg-destructive/10",
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

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-text/10 bg-background/90 backdrop-blur md:hidden">
        <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {links.map((item) => (
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
