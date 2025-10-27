import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand neon-text">🎮 Retro Consolas</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to="/categorias" className="nav-link">Categorías</Link></li>
          <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
          <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}
