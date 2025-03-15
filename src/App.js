/* src/App.js */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyCurrency from './components/BuyCurrency';
import OrderPage from './components/OrderPage';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyCurrency />} />
        <Route path="/order/:currency" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
