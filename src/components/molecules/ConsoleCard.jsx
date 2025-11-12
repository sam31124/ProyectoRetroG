import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ConsoleCard({ consoleItem }) {
  const { addToCart } = useCart();

  const agregarAlCarrito = (p) => {
    const producto = {
      id: p.id,
      name: p.name || p.nombre,
      price: Number(p.price || p.precio || 0),
      image: p.image,
    };

    // Mantener sincronía con localStorage (igual que en Productos.jsx)
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find((i) => i.id === producto.id);
    let nuevo;

    if (existe) {
      nuevo = carrito.map((i) =>
        i.id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevo));
    window.dispatchEvent(new Event('storage'));
    addToCart(producto); // sincroniza con el contexto global
    alert(`🎮 ${producto.name} agregado al carrito`);
  };

  return (
    <div className="card bg-dark text-light border-neon">
      <img
        src={consoleItem.image}
        className="card-img-top"
        alt={consoleItem.name}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{consoleItem.name}</h5>
        <p className="card-text">{consoleItem.brand}</p>
        <p className="card-text">${consoleItem.price}</p>
        <button
          className="btn btn-outline-info w-100"
          onClick={() => agregarAlCarrito(consoleItem)} // usa el método sincronizado
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
