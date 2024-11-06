import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: string; 
  customer: string;
  dish: any;
  status: string;
}

const PendingOrderList = () => {
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

        const response = await axios.get('https://vnfx11zfya.execute-api.us-east-1.amazonaws.com/dev/pendings', {
          headers: {
            'Authorization': `Bearer ${token}`,
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

  const processOrder = async (orderId: string) => {
    console.log(`Processing order with ID: ${orderId}`);
    
    try {
      const response = await axios.put(`https://oxps2k4dpi.execute-api.us-east-1.amazonaws.com/dev/prepare/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'      
        },
      });

      // Check if the response message indicates success
      if (response.data.message === 'Dish prepared') {
        // Remove the processed order from the list
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        alert("No hay suficientes ingredientes");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <p>Cargando listado Ordenes Pendientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {orders.length === 0 ? (
        <p>No hay órdenes pendientes.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Orden ID</th>
              <th>Plato</th>
              <th>Procesar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.dish.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => processOrder(order.id)}
                  >
                    Process Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingOrderList;
