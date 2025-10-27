import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConsoleProvider } from './context/ConsoleContext';
import Home from './components/pages/Home';
import Categorias from './components/pages/Categorias';
import Ofertas from './components/pages/Ofertas';
import Carrito from './components/pages/Carrito';
import Checkout from './components/pages/Checkout';
import CompraExitosa from './components/pages/CompraExitosa';
import CompraError from './components/pages/CompraError';
import AdminPanel from './components/pages/AdminPanel';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import './styles/main.css';

export default function App() {
  return (
    <ConsoleProvider>
      <Router>
        <Navbar />
        <div className="container mt-4 mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/exito" element={<CompraExitosa />} />
            <Route path="/error" element={<CompraError />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ConsoleProvider>
  );
}
