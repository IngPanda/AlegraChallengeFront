import React, { useEffect, useState } from 'react';
import { getOrderHistory } from '../services/apiService';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderHistory();
      setOrders(response);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Órdenes en preparación</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.dishName} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;