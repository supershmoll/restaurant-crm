export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number;
  }
  
export const UserRole = {
  Admin: 'admin',
  Moderator: 'moderator',
  User: 'user',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
    refreshToken: string;
    role: UserRole;
  }