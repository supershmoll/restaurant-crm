import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import EmployeeSidebar from '@/components/EmployeeSidebar';
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

export const Route = createFileRoute('/employee')({
  beforeLoad: () => {
    const user = getUser();

    // Not logged in → go to login page
    if (!user) {
      throw redirect({ to: '/login' });
    }

    // Admin/moderator trying to reach employee area → send to admin dashboard
    if (isAdminOrModerator(user)) {
      throw redirect({ to: '/admin/analytics' });
    }
  },
  component: EmployeeLayout,
});

function EmployeeLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
