import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onStar: (id: string) => void;
  onSetPriority: (id: string, priority: 'low' | 'medium' | 'high') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit,
  onStar,
  onSetPriority
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(todo.title);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            type="text" 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
          <button onClick={() => onStar(todo.id)}>
            {todo.starred ? '★' : '☆'}
          </button>
          <select 
            value={todo.priority || 'medium'}
            onChange={(e) => onSetPriority(todo.id, e.target.value as 'low' | 'medium' | 'high')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </>
      )}
    </div>
  );
};

export default TodoItem;