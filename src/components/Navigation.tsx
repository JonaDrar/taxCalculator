import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Calculadora</Link>
      <Link to="/history">Historial</Link>
    </nav>
  );
};

export default Navigation;