import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminSidebar from "@/components/layout/AdminSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

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
      <AdminSidebar />
      <main className="flex-1 overflow-auto px-4 pt-4 pb-[calc(16px+64px+env(safe-area-inset-bottom))] md:p-6">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
