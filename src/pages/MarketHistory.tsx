
import React from 'react';
import HistoryMarket from '../components/HistoryMarket';

const MarketHistory: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>Historial de Órdenes a Mercado</h2>
      <HistoryMarket />
    </div>
  );
};

export default MarketHistory;
