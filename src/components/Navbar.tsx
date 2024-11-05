import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const CustomNavbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Restaurante</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Inicio</Nav.Link>
        <Nav.Link href="#">Sobre nosotros</Nav.Link>
      </Nav>
      {isAuthenticated ? (
        <Button variant="outline-light" onClick={onLogout}>Cerrar sesión</Button>
      ) : (
        <Form onSubmit={handleLoginSubmit} className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Usuario"
            className="mr-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Contraseña"
            className="mr-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="outline-light">Iniciar sesión</Button>
        </Form>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
