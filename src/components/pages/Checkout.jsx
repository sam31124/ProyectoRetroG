import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({ carrito: [], total: 0 });
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    correo: "",
  });

  // 🔹 Cargar datos del pedido guardado en localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pedido")) || {
      carrito: [],
      total: 0,
    };
    setPedido(data);
  }, []);

  // 🔹 Manejo de cambios en formulario
  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Simular compra
  const handleCompra = () => {
    if (!cliente.nombre || !cliente.direccion || !cliente.correo) {
      alert("Por favor completa todos los datos del cliente.");
      return;
    }

    if (pedido.total === 0 || pedido.carrito.length === 0) {
      navigate("/error");
      return;
    }

    // Simulación de compra exitosa
    localStorage.removeItem("carrito");
    localStorage.removeItem("pedido");
    navigate("/exito", { state: { cliente, pedido } });
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4">🧾 Checkout</h2>

      {/* 🔹 Datos del cliente */}
      <div className="border-neon bg-dark p-4 rounded mb-4">
        <h4 className="text-info mb-3">Datos del cliente</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Av. Siempre Viva 742"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={cliente.correo}
              onChange={handleChange}
              className="form-control"
              placeholder="tuemail@ejemplo.com"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Resumen del pedido */}
      <div className="border-neon bg-dark p-4 rounded">
        <h4 className="text-info mb-3">Resumen del pedido</h4>

        {pedido.carrito.length === 0 ? (
          <p>No hay productos en tu pedido.</p>
        ) : (
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${Number(item.price).toLocaleString()}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    $
                    {(
                      Number(item.price || 0) * Number(item.cantidad || 1)
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="text-end mt-3">
          <h5 className="text-info">
            Total: ${Number(pedido.total || 0).toLocaleString()}
          </h5>
          <button
            className="btn btn-success border-neon mt-3"
            onClick={handleCompra}
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
