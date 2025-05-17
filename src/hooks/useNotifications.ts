import { useEffect } from 'react';
import { Todo } from '../types/todo';

const useNotifications = (todos: Todo[]) => {
  useEffect(() => {
    const now = new Date();
    const upcomingTodos = todos.filter(todo => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      const timeDiff = dueDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      return hoursDiff > 0 && hoursDiff < 24; // Due in next 24 hours
    });

    if (upcomingTodos.length > 0) {
      alert(`You have ${upcomingTodos.length} tasks due soon!`);
    }
  }, [todos]);
};

export default useNotifications;