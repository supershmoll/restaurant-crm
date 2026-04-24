import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import EmployeeSidebar from "@/components/layout/EmployeeSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

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
    throw redirect({ to: '/admin/analytics' });
  }
}

function EmployeeLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-auto px-4 pt-4 pb-[calc(16px+64px+env(safe-area-inset-bottom))] md:p-6">
        <AppHeader />
        <Outlet />
      </main>
    </div>
  );
}
