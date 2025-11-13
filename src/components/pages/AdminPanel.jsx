import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as consolesApi from "../../data/consoles";
import "../../styles/main.css";

// Importar el contexto
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
    switch (vista) {
      case "dashboard":
        return <Dashboard />;
      case "productos":
        return <ProductosAdmin consolas={consolas} />;
      case "categorias":
        return <CategoriasAdmin consolas={consolas} />;
      case "usuarios":
        return <UsuariosAdmin />;
      case "reportes":
        return <ReportesAdmin consolas={consolas} />;
      case "perfil":
        return <PerfilAdmin usuario={usuario} />;
      default:
        return <Dashboard />;
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
                  className="btn btn-outline-info w-100 mb-2"
                  onClick={() => setVista(key)}
                >
                  {label}
                </button>
              ))}
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}
              >
                🚪 Cerrar sesión
              </button>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 col-lg-10">
          <h2 className="neon-title text-center mb-4">
            Bienvenido, {usuario?.nombre || "Administrador"}
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
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!user || !user.correo.endsWith("@profesor.cl")) {
      alert("Acceso denegado. Solo administradores pueden ingresar.");
      navigate("/login");
      return;
    }
    setUsuario(user);
    setConsolas(consolesApi.readAll());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // Aquí se envuelve el contenido con el provider
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
