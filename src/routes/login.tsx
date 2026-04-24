import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from "@/components/auth/Login";
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const user = getUser();
    if (!user) return;
    throw redirect({
      to: isAdminOrModerator(user) ? '/admin/analytics' : '/employee/tables',
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
