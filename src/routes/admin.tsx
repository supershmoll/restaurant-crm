import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminSidebar from '@/components/AdminSidebar';
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    const user = getUser();


    if (!user) {
      throw redirect({ to: '/login' });
    }


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
      <main className="flex-1 overflow-auto p-4 pb-24 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
