import React, { useState } from 'react';
import { requestOrder } from '../api';

const OrderButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await requestOrder();
      setMessage(`Orden generada: ${response.data.dish.name}`);
    } catch (error) {
      setMessage('Error al generar la orden');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleOrder} disabled={loading}>
        {loading ? 'Generando...' : 'Pedir Plato'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderButton;
