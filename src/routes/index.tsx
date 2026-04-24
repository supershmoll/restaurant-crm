import { createFileRoute, redirect } from '@tanstack/react-router';
import { getUser, isAdminOrModerator } from '@/features/auth/authUtils';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const user = getUser();
    if (!user) {
      throw redirect({ to: '/login' });
    }
    throw redirect({
      to: isAdminOrModerator(user) ? '/admin/employees' : '/employee/tables',
    });
  },
  component: () => null,
});
