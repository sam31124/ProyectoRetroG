import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { readAll } from "../../data/consoles";
import "../../styles/main.css";

export default function Carrito() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [catalogo, setCatalogo] = useState([]);
  const [total, setTotal] = useState(0);

  // 🔹 Cargar catálogo
  useEffect(() => {
    setCatalogo(readAll());
  }, []);

  // 🔹 Calcular total cuando cambie el carrito
  useEffect(() => {
    const nuevoTotal = cart.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
      0
    );
    setTotal(nuevoTotal);
  }, [cart]);

  // 🔹 Comprar
  const comprar = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    localStorage.setItem("pedido", JSON.stringify({ cart, total }));
    clearCart();
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
                        onClick={() => addToCart(p)} // 🆕 Usa el contexto
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
            {cart.length === 0 ? (
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
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price.toLocaleString()}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-info ms-2"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          ${(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFromCart(item.id)}
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
                    onClick={clearCart}
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
