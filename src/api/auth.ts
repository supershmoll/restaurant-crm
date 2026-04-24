import { api } from './client';
import axios from 'axios';
import type { LoginCredentials, User } from '@/types/auth';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}


export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const { data: loginData } = await api.post<LoginResponse>('/auth/login', {
      ...credentials,
      expiresInMins: 60,
    });

    const { data: meData } = await api.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${loginData.accessToken}` },
    });

    return {
      ...meData,
      token: loginData.accessToken,
      refreshToken: loginData.refreshToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 401)) {
      throw new Error('Invalid username or password. Please try again.');
    }
    throw new Error('Network error. Please try again later.');
  }
};