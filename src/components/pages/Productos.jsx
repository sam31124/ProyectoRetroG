import React from "react";
import { Link } from "react-router-dom";
import { readAll } from "../../data/consoles";
import { useCart } from "../../context/CartContext";
import "../../styles/main.css";

export default function Productos() {
  const productos = readAll();
  const { addToCart } = useCart();

  const agregarAlCarrito = (p) => {
    const producto = {
      id: p.id,
      name: p.name,
      price: Number(p.price || 0),
      image: p.image,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find((i) => i.id === producto.id);

    let nuevo;
    if (existe) {
      nuevo = carrito.map((i) =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevo));
    window.dispatchEvent(new Event("storage"));
    addToCart(producto);

    alert(`🎮 ${producto.name} agregado al carrito`);
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4">Nuestros Productos</h2>

      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-6 col-md-4 col-lg-3 mb-4">

            <div className="card bg-dark text-light border-neon h-100 text-center p-2">

              {/* 🟦 NAVEGACIÓN AL DETALLE */}
              <Link
                to={`/producto/${p.id}`}
                className="text-decoration-none text-light"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6>{p.name}</h6>
                  <p>${Number(p.price).toLocaleString()}</p>
                </div>
              </Link>

              {/* 🟩 BOTÓN DEL CARRITO */}
              <button
                className="btn btn-outline-info btn-sm w-100"
                onClick={() => agregarAlCarrito(p)}
              >
                Agregar al carrito
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
