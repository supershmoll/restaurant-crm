import { UserRole, type User } from '@/types/auth';


export const getUser = (): User | null => {
  const raw = localStorage.getItem('user') ?? sessionStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};


export const saveAuth = (token: string, user: User, rememberMe: boolean): void => {
  const store = rememberMe ? localStorage : sessionStorage;
  store.setItem('token', token);
  store.setItem('user', JSON.stringify(user));
};


export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};


export const isAdminOrModerator = (user: User | null): boolean =>
  user?.role === UserRole.Admin || user?.role === UserRole.Moderator;
