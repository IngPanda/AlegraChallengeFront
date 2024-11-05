import React, { useEffect, useState } from 'react';
import { getOrderHistory } from '../api';

const OrderHistory: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await getOrderHistory();
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error al obtener el historial de pedidos', error);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <h3>Historial de Pedidos</h3>
      <ul>
        {history.map((order, index) => (
          <li key={index}>{order}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
