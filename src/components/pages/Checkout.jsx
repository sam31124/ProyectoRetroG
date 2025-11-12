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
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [isDisabled, setIsDisabled] = useState(true);

  // 🔹 Cargar datos del carrito o pedido desde localStorage
  useEffect(() => {
    // Busca primero "pedido", si no hay, usa "carrito"
    const pedidoGuardado = JSON.parse(localStorage.getItem("pedido"));
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

    if (pedidoGuardado && Array.isArray(pedidoGuardado.carrito)) {
      setPedido(pedidoGuardado);
    } else if (Array.isArray(carritoGuardado) && carritoGuardado.length > 0) {
      const total = carritoGuardado.reduce(
        (acc, item) =>
          acc + Number(item.price || 0) * Number(item.cantidad || 1),
        0
      );
      const nuevoPedido = { carrito: carritoGuardado, total };
      setPedido(nuevoPedido);
      localStorage.setItem("pedido", JSON.stringify(nuevoPedido));
    } else {
      setPedido({ carrito: [], total: 0 });
    }
  }, []);

  // 🔹 Validar correo y campos
  useEffect(() => {
    const correoRegex = /@(gmail|profesor)\.[a-zA-Z]+$/i;
    const correoValido = correoRegex.test(cliente.correo);

    const camposCompletos =
      cliente.nombre.trim() !== "" && cliente.direccion.trim() !== "";

    const carritoLleno = pedido.carrito && pedido.carrito.length > 0;

    setIsDisabled(!(correoValido && camposCompletos && carritoLleno));
  }, [cliente, pedido]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Confirmar compra
  const handleCompra = () => {
    if (isDisabled) return;

    localStorage.removeItem("carrito");
    localStorage.removeItem("pedido");

    setMensaje({
      tipo: "exito",
      texto: "Compra realizada con éxito 🎉 Redirigiendo...",
    });

    setTimeout(() => {
      navigate("/exito", { state: { cliente, pedido } });
    }, 1500);
  };

  const correoRegex = /@(gmail|profesor)\.[a-zA-Z]+$/i;

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4">🧾 Checkout</h2>

      {/* 🔹 Mensaje visual */}
      {mensaje.texto && (
        <div
          className={`alert-neon ${
            mensaje.tipo === "error" ? "error" : "exito"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

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
              className={`form-control ${
                cliente.correo && !correoRegex.test(cliente.correo)
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="tuemail@ejemplo.com"
            />
            {cliente.correo && !correoRegex.test(cliente.correo) && (
              <small className="text-danger">
                Solo se permiten correos con dominios Gmail o Profesor (ej:
                @gmail.cl, @gmail.com, @profesor.cl)
              </small>
            )}
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
            className={`btn ${
              isDisabled ? "btn-secondary" : "btn-success border-neon"
            } mt-3`}
            onClick={handleCompra}
            disabled={isDisabled}
          >
            {isDisabled ? "Completa tus datos" : "Confirmar compra"}
          </button>
        </div>
      </div>
    </div>
  );
}
