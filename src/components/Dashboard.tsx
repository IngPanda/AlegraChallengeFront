import React from 'react';
import OrderButton from './OrderButton';
import Inventory from './Inventory';
import OrderHistory from './OrderHistory';

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    window.location.href = '/login';  // Redirigir al login
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <OrderButton />
      <Inventory />
      <OrderHistory />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
