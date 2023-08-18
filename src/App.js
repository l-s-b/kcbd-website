import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import HomeEdit from './views/HomeEdit';
import ProductDetail from './views/ProductDetail';
import ScrollToTop from './comps/ScrollToTop';
import './css/App.css';
import "./css/Custom.css";
import SendPurchaseMessage from './views/SendPurchaseMessage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/${process.env.REACT_APP_EDIT_HASH}`} element={<HomeEdit />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compra-exitosa" element={<SendPurchaseMessage />} />
      </Routes>
    </Router>
  );
}
