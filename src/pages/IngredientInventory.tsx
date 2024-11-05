// src/pages/IngredientInventory.tsx
import React from 'react';
import InventoryIngredients from '../components/InventoryIngredients';

const IngredientInventory: React.FC = () => {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Inventario de Ingredientes</h2>
      <InventoryIngredients />
    </div>
  );
};

export default IngredientInventory;
