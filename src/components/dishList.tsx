import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Ingredient {
  name: string;
  cant: number;
}

interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('https://3p3u6brpl8.execute-api.us-east-1.amazonaws.com/dev/disheslist', {
          headers: {
            'Authorization': `Bearer ${ localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'      
          },
        });
        setDishes(response.data);
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

  if (loading) return <p>Cargando listado de platos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Platos</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre del Plato</th>
            <th>Ingredientes</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ingrediente</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dish.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.cant}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishesList;
