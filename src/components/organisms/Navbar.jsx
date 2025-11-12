import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand text-info fw-bold">
        ProductosG
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/productos" className="nav-link">Productos</Link>
          </li>
          <li className="nav-item">
            <Link to="/nosotros" className="nav-link">Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-link">Blogs</Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link">Contacto</Link>
          </li>
          <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>

        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Ingresar</Link>
          </li>
          <li className="nav-item">
            <Link to="/registro" className="nav-link">Registro</Link>
          </li>
          <li className="nav-item">
            <Link to="/carrito" className="nav-link border rounded px-2">
              🛒 <span className="ms-1">0</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
