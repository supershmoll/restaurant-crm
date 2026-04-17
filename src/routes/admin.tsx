import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminSidebar from '@/components/AdminSidebar';
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    const user = getUser();

    // Not logged in at all → go to login page
    if (!user) {
      throw redirect({ to: '/login' });
    }

    // Logged in but NOT admin/moderator → send to employee area
    if (!isAdminOrModerator(user)) {
      throw redirect({ to: '/employee/tables' });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
