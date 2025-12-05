import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

// 👇 1. Usamos el servicio REAL (AWS) en vez de datos locales
import ProductoService from "../../services/ProductoService"; 

// Importar el contexto (Asegúrate de que este archivo exista, si no, avísame)
import { AdminProvider, useAdmin } from "../../context/AdminContext";

// Importar componentes del panel admin
import Dashboard from "../admin/Dashboard";
import ProductosAdmin from "../admin/ProductosAdmin";
import CategoriasAdmin from "../admin/Categorias";
import UsuariosAdmin from "../admin/Usuarios";
import ReportesAdmin from "../admin/Reportes";
import PerfilAdmin from "../admin/Perfil";

function AdminPanelContent({ usuario, consolas, handleLogout }) {
  const { vista, setVista } = useAdmin();

  const renderVista = () => {
    // Pasamos las consolas reales a los componentes
    switch (vista) {
      case "dashboard": return <Dashboard />;
      case "productos": return <ProductosAdmin consolas={consolas} />;
      case "categorias": return <CategoriasAdmin consolas={consolas} />;
      case "usuarios": return <UsuariosAdmin />;
      case "reportes": return <ReportesAdmin consolas={consolas} />;
      case "perfil": return <PerfilAdmin usuario={usuario} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="container-fluid mt-4 text-light">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark border-neon p-3 rounded">
          <h4 className="text-info mb-4">⚙️ Panel Admin</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark border-0 p-0">
              {[
                ["🏠 Dashboard", "dashboard"],
                ["🎮 Productos", "productos"],
                ["🗂️ Categorías", "categorias"],
                ["👤 Usuarios", "usuarios"],
                ["📊 Reportes", "reportes"],
                ["⚙️ Perfil", "perfil"],
              ].map(([label, key]) => (
                <button
                  key={key}
                  className={`btn w-100 mb-2 text-start ${vista === key ? 'btn-info' : 'btn-outline-info'}`}
                  onClick={() => setVista(key)}
                >
                  {label}
                </button>
              ))}
              <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                🚪 Cerrar sesión
              </button>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 col-lg-10">
          <h2 className="neon-title text-center mb-4">
            Bienvenido, {usuario?.nombre || "Jefe"}
          </h2>
          {renderVista()}
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [consolas, setConsolas] = useState([]);

  useEffect(() => {
    // 1. Verificar Usuario
    const userStored = JSON.parse(localStorage.getItem("usuarioActivo"));
    
    // 🔒 VALIDACIÓN NUEVA: Usamos el ROL, no el correo
    if (!userStored || userStored.rol !== 'admin') {
      alert("⛔ Acceso denegado. Se requiere rol de Administrador.");
      navigate("/login");
      return;
    }
    
    setUsuario(userStored);

    // 2. Cargar Datos Reales de AWS
    ProductoService.getAllProductos()
      .then(response => {
        console.log("Datos cargados en Admin:", response.data);
        setConsolas(response.data);
      })
      .catch(error => {
        console.error("Error cargando productos para admin:", error);
      });

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("token"); // Borrar token también
    window.dispatchEvent(new Event("usuarioActualizado"));
    navigate("/");
  };

  return (
    <AdminProvider>
      <AdminPanelContent
        usuario={usuario}
        consolas={consolas}
        handleLogout={handleLogout}
      />
    </AdminProvider>
  );
}