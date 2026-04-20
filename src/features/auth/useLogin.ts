import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import type { LoginCredentials, User } from '@/types/auth';

export const useLogin = () => {
  return useMutation<User, Error, LoginCredentials>({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    retry: false,
  });
};