export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
    starred?: boolean;
    createdAt?: string;
  }