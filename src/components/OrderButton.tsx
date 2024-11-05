import React, { useState } from 'react';
import { requestOrder } from '../api';

const OrderButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    console.log("handleOrder called"); // Confirmación de que handleOrder se llama
    setLoading(true);
    setMessage('');
    try {
      const response = await requestOrder();
      console.log("API response:", response); // Verifica la respuesta de la API
      setMessage(`Orden generada: ${response.data.dish.name}`);
    } catch (error) {
      console.error("API request failed:", error); // Registra el error
      setMessage('Error al generar la orden');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleOrder} disabled={loading} style={{ padding: '10px 20px', fontSize: '16px' }}>
        {loading ? 'Generando...' : 'Pedir Plato'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderButton;
