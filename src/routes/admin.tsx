import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AppSidebar, { type SidebarLink } from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';
import Home_light from "/images/Home_light.svg";
import Group_light from "/images/Group_light.svg";

const ADMIN_LINKS: SidebarLink[] = [
  { to: "/", label: "Home", icon: Home_light, alt: "Home" },
  { to: "/admin/employees", label: "Employees", icon: Group_light, alt: "Employees" },
];

export const Route = createFileRoute('/admin')({
  beforeLoad: beforeLoadAdminRoute,
  component: AdminLayout,
});

function beforeLoadAdminRoute() {
  const user = getUser();
  if (!user) {
    throw redirect({ to: '/login' });
  }

  if (!isAdminOrModerator(user)) {
    throw redirect({ to: '/employee/tables' });
  }
}

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar storageKey="adminSidebarCollapsed" links={ADMIN_LINKS} tone="light" />
      <main className="flex-1 overflow-auto px-4 pt-4 pb-[calc(16px+64px+env(safe-area-inset-bottom))] md:p-6">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
