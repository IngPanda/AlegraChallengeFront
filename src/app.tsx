import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import OrderRequest from './pages/OrderRequest';
import PreparingOrders from './pages/PreparingOrders';
import IngredientInventory from './pages/IngredientInventory';
import OrderHistory from './pages/OrderHistory';
import RecipeList from './pages/RecipeList';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <CustomNavbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/order-request" element={isAuthenticated ? <OrderRequest /> : <Navigate to="/" />} />
        <Route path="/preparing-orders" element={isAuthenticated ? <PreparingOrders /> : <Navigate to="/" />} />
        <Route path="/ingredient-inventory" element={isAuthenticated ? <IngredientInventory /> : <Navigate to="/" />} />
        <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/" />} />
        <Route path="/recipe-list" element={isAuthenticated ? <RecipeList /> : <Navigate to="/" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/order-request" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
