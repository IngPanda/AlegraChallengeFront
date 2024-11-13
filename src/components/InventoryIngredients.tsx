import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ingredients {
  [ingredient: string]: number;
}

const InventoryIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredients>({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('https://a2ffc1rut9.execute-api.us-east-1.amazonaws.com/dev/inventory', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'      
          },
        });
        setIngredients(response.data);
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

    fetchIngredients();
  }, []);

  if (loading) return <p>Cargando inventario de ingredientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {Object.keys(ingredients).length === 0 ? (
        <p>No hay Ingredientes.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ingredients).map(([ingredient, quantity]) => (
              <tr key={ingredient}>
                <td>{ingredient}</td>
                <td>{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryIngredients;

