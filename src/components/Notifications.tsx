import React, { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { Icon } from '@fluentui/react';
import './Notifications.css';

interface NotificationsProps {
  todos: Todo[];
  onDismiss: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ todos, onDismiss }) => {
  const [notifications, setNotifications] = useState<Todo[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    const upcomingTodos = todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      
      const dueDate = new Date(todo.dueDate);
      const timeDiff = dueDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      // Show notification for tasks due in the next 24 hours
      return hoursDiff > 0 && hoursDiff <= 24;
    });

    setNotifications(upcomingTodos);
    setVisible(upcomingTodos.length > 0);
  }, [todos]);

  const handleDismiss = (id: string) => {
    onDismiss(id);
    setNotifications(prev => prev.filter(todo => todo.id !== id));
    if (notifications.length <= 1) setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <Icon iconName="Ringer" className="notification-icon" />
        <h3>Upcoming Tasks</h3>
        <button 
          className="dismiss-all"
          onClick={() => setVisible(false)}
        >
          Dismiss All
        </button>
      </div>
      
      <ul className="notifications-list">
        {notifications.map(todo => (
          <li key={todo.id} className={`notification-item ${todo.priority}`}>
            <div className="notification-content">
              <span className="todo-title">{todo.title}</span>
              <span className="due-date">
                Due: {new Date(todo.dueDate!).toLocaleString()}
              </span>
              {todo.priority === 'high' && (
                <span className="priority-badge">High Priority</span>
              )}
            </div>
            <button
              className="dismiss-button"
              onClick={() => handleDismiss(todo.id)}
            >
              <Icon iconName="ChromeClose" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;