import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AppSidebar, { type SidebarLink } from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';
import drink_light from "/images/drink_light.svg";
import Desk_alt_light from "/images/Desk_alt_light.svg";

const EMPLOYEE_LINKS: SidebarLink[] = [
  { to: "/employee/tables", label: "Tables", icon: drink_light, alt: "Drink" },
  { to: "/employee/orders", label: "Orders", icon: Desk_alt_light, alt: "Desk" },
];

export const Route = createFileRoute('/employee')({
  beforeLoad: beforeLoadEmployeeRoute,
  component: EmployeeLayout,
});

function beforeLoadEmployeeRoute() {
  const user = getUser();

  if (!user) {
    throw redirect({ to: '/login' });
  }

  if (isAdminOrModerator(user)) {
    throw redirect({ to: '/admin/employees' });
  }
}

function EmployeeLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar storageKey="employeeSidebarCollapsed" links={EMPLOYEE_LINKS} tone="dark" />
      <main className="flex-1 overflow-auto px-4 pt-4 pb-[calc(16px+64px+env(safe-area-inset-bottom))] md:p-6">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
