import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readAll } from "../../data/consoles";
import "../../styles/main.css";

export default function Carrito() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [catalogo, setCatalogo] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔹 Cargar catálogo y carrito
  useEffect(() => {
    setCatalogo(readAll());
    const saved = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(saved);
    calcularTotal(saved);
  }, []);

  // 🔹 Guardar carrito y recalcular total
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal(carrito);
  }, [carrito]);

  // 🔹 Calcular total
  const calcularTotal = (items) => {
    const t = items.reduce(
      (acc, i) => acc + (Number(i.price) || 0) * (i.cantidad || 1),
      0
    );
    setTotal(t);
  };

  // 🔹 Agregar producto (usa name o nombre según exista)
  const agregarProducto = (p) => {
    const producto = {
      id: p.id,
      name: p.name || p.nombre,
      price: Number(p.price || p.precio || 0),
      image: p.image,
    };

    const existe = carrito.find((item) => item.id === producto.id);
    let nuevo;

    if (existe) {
      nuevo = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
    window.dispatchEvent(new Event("storage"));
    alert(`🎮 ${producto.name} agregado al carrito`);
  };

  // 🔹 Cambiar cantidad
  const cambiarCantidad = (id, delta) => {
    const actualizado = carrito
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
          : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(actualizado);
    window.dispatchEvent(new Event("storage"));
  };

  // 🔹 Eliminar producto
  const eliminarProducto = (id) => {
    const nuevo = carrito.filter((i) => i.id !== id);
    setCarrito(nuevo);
    window.dispatchEvent(new Event("storage"));
  };

  // 🔹 Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    setTotal(0);
    window.dispatchEvent(new Event("storage"));
  };

  // 🔹 Comprar (vacía el carrito y guarda pedido)
  const comprar = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    localStorage.setItem("pedido", JSON.stringify({ carrito, total }));
    setCarrito([]);
    localStorage.removeItem("carrito");
    setTotal(0);
    window.dispatchEvent(new Event("storage"));
    navigate("/checkout");
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title mb-4 text-center">🕹️ Carrito de Compras</h2>

      <div className="row">
        {/* 🔹 Catálogo */}
        <div className="col-lg-6 mb-4">
          <div className="border-neon p-3 bg-dark rounded">
            <h4 className="text-info mb-3">Catálogo</h4>
            <div className="row">
              {catalogo.map((p) => (
                <div key={p.id} className="col-6 col-md-4 mb-4">
                  <div className="card bg-dark text-light border-neon h-100 text-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="card-img-top"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6>{p.name}</h6>
                      <p>${Number(p.price).toLocaleString()}</p>
                      <button
                        className="btn btn-outline-info btn-sm w-100"
                        onClick={() => agregarProducto(p)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Carrito */}
        <div className="col-lg-6">
          <div className="border-neon p-3 bg-dark rounded">
            <h4 className="text-info mb-3">Tu Carrito</h4>
            {carrito.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <>
                <table className="table table-dark table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price.toLocaleString()}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              onClick={() => cambiarCantidad(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                              className="btn btn-sm btn-outline-info ms-2"
                              onClick={() => cambiarCantidad(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          ${(item.price * item.cantidad).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminarProducto(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-end mt-3">
                  <h5 className="text-info">
                    Total: ${total.toLocaleString()}
                  </h5>
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={vaciarCarrito}
                  >
                    Vaciar
                  </button>
                  <button className="btn btn-success" onClick={comprar}>
                    Comprar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
