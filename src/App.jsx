import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import ProductsList from "./components/ProductsList";
import Checkout from "./pages/Checkout";
import Carrito from "./components/Carrito";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Carrito />
      <Footer />
    </>
  );
}

export default App;
