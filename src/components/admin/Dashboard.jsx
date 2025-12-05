import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBox, FaUsers, FaChartBar, FaTags, FaUserCog } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";
import ProductoService from "../../services/ProductoService"; // 👈 Importamos el servicio real

export default function Dashboard() {
  const { setVista } = useAdmin();
  
  // Estado para las estadísticas
  const [stats, setStats] = useState({
    productos: 0,
    usuarios: 3, // Valor fijo (Ya que no tenemos endpoint de usuarios aún)
    stockTotal: 0,
    valorInventario: 0
  });

  useEffect(() => {
    // 📡 Cargar datos reales desde AWS
    ProductoService.getAllProductos()
      .then((res) => {
        const listaProductos = res.data;
        
        // Calculamos estadísticas reales
        const totalProductos = listaProductos.length;
        const totalStock = listaProductos.reduce((acc, p) => acc + Number(p.stock || 0), 0);
        const valorTotal = listaProductos.reduce((acc, p) => acc + (Number(p.precio) * Number(p.stock || 0)), 0);

        setStats({
          productos: totalProductos,
          usuarios: 3, // Admin, Vendedor, Cliente (Los que creamos en SQL)
          stockTotal: totalStock,
          valorInventario: valorTotal
        });
      })
      .catch((err) => console.error("Error cargando dashboard:", err));
  }, []);

  return (
    <div className="container-fluid text-light">
      <h3 className="mb-4 text-info">📊 Dashboard General</h3>
      <p className="text-secondary mb-5">Resumen en tiempo real de tu tienda (AWS RDS)</p>

      {/* TARJETAS SUPERIORES */}
      <div className="row g-4 mb-5">
        
        {/* Tarjeta 1: Productos (Datos Reales) */}
        <div className="col-md-4">
          <div className="card text-light shadow-lg border-0 h-100" style={{ backgroundColor: "#198754" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Productos Activos</h5>
                <h2 className="display-4 fw-bold">{stats.productos}</h2>
              </div>
              <FaBox size={50} style={{ opacity: 0.8 }} />
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Stock Total (Reemplaza a "Compras" por ahora) */}
        <div className="col-md-4">
          <div className="card text-light shadow-lg border-0 h-100" style={{ backgroundColor: "#007bff" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Stock Total</h5>
                <h2 className="display-4 fw-bold">{stats.stockTotal}</h2>
                <small className="text-light">Unidades físicas</small>
              </div>
              <FaShoppingCart size={50} style={{ opacity: 0.8 }} />
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Usuarios (Estático por ahora) */}
        <div className="col-md-4">
          <div className="card text-dark shadow-lg border-0 h-100" style={{ backgroundColor: "#ffc107" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Usuarios</h5>
                <h2 className="display-4 fw-bold">{stats.usuarios}</h2>
                <small>Registrados en BD</small>
              </div>
              <FaUsers size={50} style={{ opacity: 0.8 }} />
            </div>
          </div>
        </div>
      </div>

      {/* TARJETAS INFERIORES (Accesos directos) */}
      <h4 className="text-secondary mb-3">Accesos Rápidos</h4>
      <div className="row g-4">
        {[
          { icon: <FaChartBar size={25} />, label: "Reportes", key: "reportes", desc: "Ver estadísticas" },
          { icon: <FaTags size={25} />, label: "Categorías", key: "categorias", desc: "Gestionar grupos" },
          { icon: <FaUserCog size={25} />, label: "Perfil", key: "perfil", desc: "Mis datos" },
        ].map((item, i) => (
          <div className="col-md-4" key={i}>
            <div className="card bg-dark border-neon p-4 text-center shadow-sm h-100 hover-card">
              <div className="mb-3 text-info">{item.icon}</div>
              <h5 className="fw-bold text-light">{item.label}</h5>
              <p className="text-secondary small">{item.desc}</p>
              <button
                className="btn btn-outline-info w-50"
                onClick={() => setVista(item.key)}
              >
                Ir a {item.label}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}