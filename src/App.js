import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConsoleProvider } from './context/ConsoleContext';
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
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import './styles/main.css';

export default function App() {
  return (
    <ConsoleProvider>
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
            <Route path="/contacto" element={<Contacto />} />
            
          </Routes>
        </main>
        <Footer />
      </Router>
    </ConsoleProvider>
  );
}
