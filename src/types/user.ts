// src/types/user.ts
export interface User {
    id: string;
    username: string;
    email?: string;
    token?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }