import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🧩 Contextos
import { ConsoleProvider } from './context/ConsoleContext';
import { CartProvider } from './context/CartContext';

// 📄 Páginas
import Home from './components/pages/Home';
import Productos from './components/pages/Productos';
import Ofertas from './components/pages/Ofertas';
import Carrito from './components/pages/Carrito';
import Checkout from './components/pages/Checkout';
import Nosotros from './components/pages/Nosotros';
import CompraExitosa from './components/pages/CompraExitosa';
import CompraError from './components/pages/CompraError';
import AdminPanel from './components/pages/AdminPanel';
import Contacto from './components/pages/Contacto';
import Blogs from './components/pages/Blogs';
import Registro from './components/pages/Registro';
import Login from './components/pages/Login';
import ProductoDetalle from "./components/pages/ProductoDetalle";



import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';

import './styles/main.css';
import './App.css';



export default function App() {
  return (
    <ConsoleProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="container py-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/exito" element={<CompraExitosa />} />
              <Route path="/error" element={<CompraError />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </ConsoleProvider>
  );
}
