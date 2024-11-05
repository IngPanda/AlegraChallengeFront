import React from 'react';
import OrderButton from '../components/OrderButton';

const OrderRequest: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Pedir Orden</h2>
      <OrderButton />
    </div>
  );
};

export default OrderRequest;
