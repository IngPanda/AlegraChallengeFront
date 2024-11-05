// src/pages/OrderHistory.tsx
import React from 'react';
import HistoryOrders from '../components/HistoryOrders ';

const OrderHistory: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Historial de Órdenes</h2>
      <HistoryOrders />
    </div>
  );
};

export default OrderHistory;
