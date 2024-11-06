import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const CustomNavbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL ?? '', {
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
      navigate('/dashboard');
    } catch (error) {
      setError('Error en las credenciales, intente nuevamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Jornada de almuerzo ¡Gratis!</Navbar.Brand>
      
      {isAuthenticated ? (
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/order-request">Pedir Orden</Nav.Link>
          <Nav.Link as={Link} to="/pending-orders">Órdenes Pendientes</Nav.Link>
          <Nav.Link as={Link} to="/ingredient-inventory">Inventario de Ingredientes</Nav.Link>
          <Nav.Link as={Link} to="/order-history">Historial de Órdenes</Nav.Link>
          <Nav.Link as={Link} to="/recipe-list">Listado de Recetas</Nav.Link>
          <Button variant="outline-light" onClick={handleLogout} className="ml-3">
            Cerrar sesión
          </Button>
        </Nav>
      ) : (
        <Form onSubmit={handleLogin} className="d-flex align-items-center ml-auto">
          <FormControl
            type="text"
            placeholder="Usuario"
            className="mr-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FormControl
            type="password"
            placeholder="Contraseña"
            className="mr-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="outline-light">Iniciar sesión</Button>
        </Form>
      )}

      {error && <p style={{ color: 'red', marginLeft: '10px' }}>{error}</p>}
    </Navbar>
  );
};

export default CustomNavbar;
