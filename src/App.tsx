import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';
import { Todo } from './types/todo';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Filters from './components/Filters';
import useNotifications from './hooks/useNotifications';
import UserAuth from './components/UserAuth';
import { login, logout } from './services/authService';
import { fetchTodos, saveTodos } from './services/todoService';
import Notifications from './components/Notifications';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [todos, setTodos] = useLocalStorage(`todos-${userId}`, []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        setUserId('default-user');
        const fetchedTodos = await fetchTodos('default-user');
        setTodos(fetchedTodos);
      }
      setIsLoading(false);
    };
    initAuth();
  }, [setTodos]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.id);
        const fetchedTodos = await fetchTodos(user.id);
        setTodos(fetchedTodos);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      if (userId) {
        await saveTodos(userId, todos);
      }
      await logout();
      setIsAuthenticated(false);
      setUserId('');
      setTodos([]);
      setDismissedNotifications([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDismissNotification = (id: string) => {
    setDismissedNotifications([...dismissedNotifications, id]);
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const updateTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
    if (isAuthenticated) {
      saveTodos(userId, updatedTodos).catch(console.error);
    }
  };

  const addTodo = (title: string) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      starred: false,
      priority: 'medium' as const,
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    updateTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
    updateTodos(updatedTodos);
  };

  const editTodo = (id: string, newTitle: string) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    updateTodos(updatedTodos);
  };

  const starTodo = (id: string) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    );
    updateTodos(updatedTodos);
  };

  const setPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, priority } : todo
    );
    updateTodos(updatedTodos);
  };

  useNotifications(todos);

  if (isLoading) {
    return <div className="app loading">Loading...</div>;
  }

  return (
    <div className="app">
      <UserAuth 
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />

      <Notifications 
        todos={todos.filter((todo: Todo) => !dismissedNotifications.includes(todo.id))} 
        onDismiss={handleDismissNotification} 
      />

      {isAuthenticated ? (
        <>
          <h1>Todo App</h1>
          <AddTodo onAdd={addTodo} />
          <Filters currentFilter={filter} onFilterChange={setFilter} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onStar={starTodo}
            onSetPriority={setPriority}
          />
        </>
      ) : (
        <div className="welcome-message">
          <h1>Welcome to Todo App</h1>
          <p>Please log in to manage your tasks</p>
        </div>
      )}
    </div>
  );
};

export default App;