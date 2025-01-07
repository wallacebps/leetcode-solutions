import React, { useState } from "react";
import { useUser } from "../context/UserContext";

function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    login(username);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Digite seu nome de usuário"
        className="p-2 border rounded-md w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
