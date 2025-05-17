import { Todo } from '../types/todo';

// Mock todo service
export const fetchTodos = async (userId: string): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTodos = localStorage.getItem(`todos-${userId}`);
      resolve(storedTodos ? JSON.parse(storedTodos) : []);
    }, 500);
  });
};

export const saveTodos = async (userId: string, todos: Todo[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(`todos-${userId}`, JSON.stringify(todos));
      resolve();
    }, 500);
  });
};