import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onStar: (id: string) => void;
  onSetPriority: (id: string, priority: 'low' | 'medium' | 'high') => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onEdit,
  onStar,
  onSetPriority
}) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onStar={onStar}
          onSetPriority={onSetPriority}
        />
      ))}
    </div>
  );
};

export default TodoList;