import React, { useEffect, useState } from 'react';
import { getInventory } from '../api';

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        setInventory(response.data);
      } catch (error) {
        console.error('Error al obtener el inventario', error);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div>
      <h3>Inventario de Bodega</h3>
      <ul>
        {Object.entries(inventory).map(([ingredient, quantity]) => (
          <li key={ingredient}>{ingredient}: {quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;

