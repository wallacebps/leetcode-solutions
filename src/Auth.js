import React, { useState } from 'react';
import { useUser } from './UserContext';

const Auth = () => {
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) login(username);
  };

  return (
    <div className="p-6">
      {!user ? (
        <div>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button onClick={handleLogin} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
        </div>
      ) : (
        <div>
          <p>Bem-vindo, {user.username}!</p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
