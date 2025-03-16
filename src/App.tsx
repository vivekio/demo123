import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login.tsx';
import ProductListPage from './pages/home.tsx';
import CartPage from './pages/cart.tsx';
import ProductDetail from './pages/productDetail.tsx';
const App:React.FC=()=> {
  return ( <>
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
