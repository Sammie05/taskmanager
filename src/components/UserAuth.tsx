import React, { useState } from 'react';

interface UserAuthProps {
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

const UserAuth: React.FC<UserAuthProps> = ({ onLogin, onLogout, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="user-auth">
      {isAuthenticated ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default UserAuth;