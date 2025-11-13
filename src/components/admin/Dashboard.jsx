import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBox, FaUsers, FaChartBar, FaTags, FaUserCog } from "react-icons/fa";
import { useAdmin } from "../../context/AdminContext";

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const { setVista } = useAdmin();

  useEffect(() => {
    const productosLS = JSON.parse(localStorage.getItem("retro_consoles_v1")) || [];
    const usuariosLS = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];
    const pedidosLS = JSON.parse(localStorage.getItem("pedido"))?.carrito || [];

    setProductos(productosLS);
    setUsuarios(usuariosLS);
    setPedidos(pedidosLS);
  }, []);

  return (
    <div className="container-fluid text-light">
      <h3 className="mb-4">📊 Dashboard</h3>
      <p className="text-secondary mb-5">Resumen de las actividades diarias</p>

      {/* TARJETAS SUPERIORES */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-light shadow-lg border-0" style={{ backgroundColor: "#007bff" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Compras</h5>
                <h2>{pedidos.length}</h2>
              </div>
              <FaShoppingCart size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-light shadow-lg border-0" style={{ backgroundColor: "#198754" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Productos</h5>
                <h2>{productos.length}</h2>
              </div>
              <FaBox size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-dark shadow-lg border-0" style={{ backgroundColor: "#ffc107" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">Usuarios</h5>
                <h2>{usuarios.length}</h2>
              </div>
              <FaUsers size={40} />
            </div>
          </div>
        </div>
      </div>

      {/* TARJETAS INFERIORES */}
      <div className="row g-4">
        {[
          { icon: <FaChartBar size={25} />, label: "Reportes", key: "reportes" },
          { icon: <FaTags size={25} />, label: "Categorías", key: "categorias" },
          { icon: <FaUserCog size={25} />, label: "Perfil", key: "perfil" },
        ].map((item, i) => (
          <div className="col-md-4" key={i}>
            <div className="card bg-dark border-neon p-4 text-center shadow-sm h-100">
              <div className="mb-3">{item.icon}</div>
              <h5 className="fw-bold">{item.label}</h5>
              <p className="text-secondary">
                Administración de {item.label.toLowerCase()}.
              </p>
              <button
                className="btn btn-outline-info w-50"
                onClick={() => setVista(item.key)}
              >
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
