import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import HomeEdit from './views/HomeEdit';
import ProductDetail from './views/ProductDetail';
import ScrollToTop from './comps/ScrollToTop';
import './css/App.css';
import "./css/Custom.css";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/e76c98592c638ca3e93658f960a0f67e" element={<HomeEdit />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
