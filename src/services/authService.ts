// src/services/authService.ts
import { User } from '../types/user';

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    token: 'mock-token-123'
  }
];

export const login = async (username: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation - in real app this would be a backend call
      const user = mockUsers.find(u => 
        u.username === username && password === 'password' // Hardcoded password for mock
      );
      
      if (user) {
        localStorage.setItem('authToken', user.token || '');
        resolve({
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token
        });
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    localStorage.removeItem('authToken');
    resolve();
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const token = localStorage.getItem('authToken');
    const user = mockUsers.find(u => u.token === token) || null;
    resolve(user ? {
      id: user.id,
      username: user.username,
      email: user.email,
      token: user.token
    } : null);
  });
};