// src/pages/RecipeList.tsx
import React from 'react';
import DishesList from '../components/dishList';

const RecipeList: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Listado de Recetas con Ingredientes</h2>
      <DishesList />
    </div>
  );
};

export default RecipeList;
