import axios from 'axios';
import React, { useState } from 'react';

interface LoginFormProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://i0upq2eps0.execute-api.us-east-1.amazonaws.com/dev/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setError('');
      // Redirigir después del inicio de sesión
    } catch (error) {
      setError('Error en las credenciales, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
