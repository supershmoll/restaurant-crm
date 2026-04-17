export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number;
  }
  
  export type UserRole = 'admin' | 'moderator' | 'user';

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