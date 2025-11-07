import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/main.css";

export default function Navbar() {
  const location = useLocation();
  const [contador, setContador] = useState(0);

  // 🔹 Actualizar contador del carrito
  const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setContador(totalItems);
  };

  useEffect(() => {
    actualizarContador();
    window.addEventListener("storage", actualizarContador);
    return () => window.removeEventListener("storage", actualizarContador);
  }, []);

  // 🔹 Actualizar contador cuando cambia la ruta (por si vuelve del checkout)
  useEffect(() => {
    actualizarContador();
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand neon-text">
          🎮 RetroG
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito{" "}
                {contador > 0 && (
                  <span className="badge bg-info text-dark ms-1">
                    {contador}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
