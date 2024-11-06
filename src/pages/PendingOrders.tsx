// src/pages/OrderHistory.tsx
import React from 'react';

import PendingOrderList from '../components/PendingOrders';

const PendingOrders: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Ordenes pendientes</h2>
      <PendingOrderList />
    </div>
  );
};

export default PendingOrders;
