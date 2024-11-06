import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Order {
  id: string; 
  customer: string;
  dish: any;
  status: string;
  createdAt: string;
}
const HistoryOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('https://vnfx11zfya.execute-api.us-east-1.amazonaws.com/dev/history', {
          headers: {
            'Authorization': `Bearer ${ localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'      
          },
        });
        setOrders(response.data);
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
      {orders.length === 0 ? (
        <p>No hay órdenes en preparación.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Orden ID</th>
              <th>Plato</th>
              <th>Estado</th>
              <th>Pedido</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.dish.name}</td>
                <td>{order.status == 'cooking' ? 'Pendiente por falta de ingredientes ' : order.status }</td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryOrders;
