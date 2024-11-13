import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface markets {
  id: string; 
  orderId: string;
  dishName: string;
  ingredientName: string;
  quantitySold: string;
  createdAt: string;
}
const HistoryMarket = () => {
  const [markets, setMarkets] = useState<markets[]>([]); 
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

        const response = await axios.get('https://a2ffc1rut9.execute-api.us-east-1.amazonaws.com/dev/market/history', {
          headers: {
            'Authorization': `Bearer ${ localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'      
          },
        });
        setMarkets(response.data);
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

  if (loading) return <p>Cargando Hisotiral de ordenes al mercado...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {markets.length === 0 ? (
        <p>No hay órdenes.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Plato</th>
              <th>Ingrediente</th>
              <th>Despachado</th>
              <th>Pedido</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market) => (
              <tr key={market.orderId}>
                <td>{market.orderId}</td>
                <td>{market.dishName}</td>
                <td>{market.ingredientName}</td>
                <td>{market.quantitySold}</td>
                <td>{formatDate(market.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryMarket;
