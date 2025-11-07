import React from "react";
import "../../styles/main.css";

export default function ConsoleCard({ consoleItem }) {
  const handleAddToCart = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex((i) => i.id === consoleItem.id);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...consoleItem, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("storage")); // 🔹 actualiza contador del navbar
    alert(`${consoleItem.name} agregado al carrito 🛒`);
  };

  return (
    <div className="card bg-dark text-light border-neon h-100">
      <img
        src={consoleItem.image}
        alt={consoleItem.name}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{consoleItem.name}</h5>
        <p className="card-text">{consoleItem.brand}</p>
        <p className="fw-bold text-info">${consoleItem.price.toLocaleString()}</p>
        <button
          className="btn btn-outline-info border-neon mt-2"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
