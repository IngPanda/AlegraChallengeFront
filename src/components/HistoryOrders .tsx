import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Order {
  id: string; 
  customer: string;
  dish: any;
  status: string;
}
const HistoryOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setOrders(response.data.orders);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando Hisotiral de ordenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Órdenes en Preparación</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes en preparación.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Orden ID:</strong> {order.id}</p>
              <p><strong>Cliente:</strong> {order.customer}</p>
              <p><strong>Plato:</strong> {order.dish}</p>
              <p><strong>Estado:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryOrders;
