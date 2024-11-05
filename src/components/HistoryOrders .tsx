import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get(
          'https://7s9x7vuh2m.execute-api.us-east-1.amazonaws.com/dev/history',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setOrders(response.data);
      }   catch (err) {
       console.log(err);
      }finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes en preparación...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Historial de Ordenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes en preparación.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Orden ID:</strong> {order.id}</p>
              <p><strong>Plato:</strong> {order.dish.name}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Estado:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryOrders;
