import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService"; 
import "../../styles/main.css";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar usuario al iniciar
  useEffect(() => {
    const cargarUsuario = () => {
      const userStored = localStorage.getItem("usuarioActivo");
      if (userStored) {
        setUsuario(JSON.parse(userStored));
      } else {
        setUsuario(null);
      }
    };

    cargarUsuario();

    // Escuchar cambios (login/logout)
    window.addEventListener("usuarioActualizado", cargarUsuario);
    return () => window.removeEventListener("usuarioActualizado", cargarUsuario);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUsuario(null);
    navigate("/login");
  };

  // ✅ VALIDACIÓN REAL DE ROL
  const esAdmin = usuario?.rol === 'admin';
  const esVendedor = usuario?.rol === 'vendedor';
  const estaEnAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 border-bottom border-neon">
      <Link to="/" className="navbar-brand text-info fw-bold fs-3">
        RetroG 👾
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* 🔗 MENÚ PRINCIPAL (Restaurado) */}
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to="/productos" className="nav-link">Productos</Link></li>
          <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
          <li className="nav-item"><Link to="/nosotros" className="nav-link">Nosotros</Link></li>
          <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs</Link></li>
          <li className="nav-item"><Link to="/contacto" className="nav-link">Contacto</Link></li>
          
          {/* Enlace especial para empleados */}
          {(esAdmin || esVendedor) && (
             <li className="nav-item"><Link to="/ventas" className="nav-link text-success fw-bold">Ventas</Link></li>
          )}
        </ul>

        {/* 🛒 CARRITO Y USUARIO */}
        <ul className="navbar-nav align-items-center gap-3">
          <li className="nav-item">
            <Link to="/carrito" className="btn btn-outline-light position-relative">
              🛒 Carrito
            </Link>
          </li>

          {/* NO HAY SESIÓN */}
          {!usuario && (
            <>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-primary btn-sm">Ingresar</Link>
              </li>
              <li className="nav-item">
                <Link to="/registro" className="btn btn-primary btn-sm">Registro</Link>
              </li>
            </>
          )}

          {/* SÍ HAY SESIÓN */}
          {usuario && (
            <>
              {/* Botón Admin solo para ADMINS */}
              {esAdmin && !estaEnAdmin && (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Panel Admin
                  </button>
                </li>
              )}

              {/* Menú de Usuario */}
              <li className="nav-item dropdown">
                <button 
                    className="btn btn-outline-info dropdown-toggle btn-sm" 
                    data-bs-toggle="dropdown"
                >
                  Hola, {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li><span className="dropdown-item-text text-muted small">Rol: {usuario.rol}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}