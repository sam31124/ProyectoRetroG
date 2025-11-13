import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/main.css";

export default function Navbar() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo"))
  );
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Mantener sincronizado el usuario entre pestañas y después de logout
  useEffect(() => {
    const actualizarUsuario = () => {
      const user = JSON.parse(localStorage.getItem("usuarioActivo"));
      setUsuario(user || null);
    };

    // Escucha eventos personalizados y del storage
    window.addEventListener("usuarioActualizado", actualizarUsuario);
    window.addEventListener("storage", actualizarUsuario);

    return () => {
      window.removeEventListener("usuarioActualizado", actualizarUsuario);
      window.removeEventListener("storage", actualizarUsuario);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    window.dispatchEvent(new Event("usuarioActualizado"));
    navigate("/");
  };

  const esAdmin = usuario?.correo?.endsWith("@profesor.cl");
  const estaEnAdmin = location.pathname.startsWith("/admin");

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
          <li className="nav-item"><Link to="/productos" className="nav-link">Productos</Link></li>
          <li className="nav-item"><Link to="/nosotros" className="nav-link">Nosotros</Link></li>
          <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs</Link></li>
          <li className="nav-item"><Link to="/contacto" className="nav-link">Contacto</Link></li>
          <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
        </ul>

        <ul className="navbar-nav align-items-center">
          {/* Mostrar solo si no hay sesión */}
          {!usuario && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Ingresar</Link>
              </li>
              <li className="nav-item">
                <Link to="/registro" className="nav-link">Registro</Link>
              </li>
            </>
          )}

          {/* Carrito siempre visible */}
          <li className="nav-item">
            <Link to="/carrito" className="nav-link border rounded px-2">
              🛒 <span className="ms-1">Carrito</span>
            </Link>
          </li>

          {/* Botón admin */}
          {esAdmin && !estaEnAdmin && (
            <li className="nav-item ms-2">
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => navigate("/admin")}
              >
                Ir al panel admin
              </button>
            </li>
          )}

          {/* Cerrar sesión (para todos los logueados) */}
          {usuario && (
            <li className="nav-item ms-2">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}




