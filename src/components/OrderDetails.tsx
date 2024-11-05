import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get(
          `https://7s9x7vuh2m.execute-api.us-east-1.amazonaws.com/dev/orders/${orderId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setOrder(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Cargando detalles de la orden...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Detalles de la Orden</h2>
      {order ? (
        <div>
          <p><strong>Orden ID:</strong> {order.id}</p>
          <p><strong>Cliente:</strong> {order.customer}</p>
          <p><strong>Plato:</strong> {order.dish}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          {/* Otros detalles específicos */}
        </div>
      ) : (
        <p>No se encontró la orden.</p>
      )}
    </div>
  );
};

export default OrderDetails;
