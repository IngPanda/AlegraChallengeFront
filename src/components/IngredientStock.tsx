import React, { useEffect, useState } from 'react';
import { getInventory } from '../services/apiService';

const IngredientStock: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await getInventory();
      setIngredients(response);
    };

    fetchIngredients();
  }, []);

  return (
    <div>
      <h2>Ingredientes en Bodega</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}: {ingredient.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientStock;
