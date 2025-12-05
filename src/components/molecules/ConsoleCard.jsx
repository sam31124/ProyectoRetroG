import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ConsoleCard({ consoleItem }) {
  const { addToCart } = useCart();

  // 1. NORMALIZACIÓN DE DATOS
  const nombre = consoleItem.nombre || consoleItem.name || "Producto sin nombre";
  const precio = Number(consoleItem.precio || consoleItem.price || 0);
  
  // Usamos la imagen que viene o una por defecto
  const imagen = consoleItem.imagen_url || consoleItem.image || "/assets/portadatienda.jpg";
  const detalle = consoleItem.descripcion || consoleItem.brand || "";

  const agregarAlCarrito = () => {
    const producto = {
      id: consoleItem.id,
      name: nombre,
      price: precio,
      image: imagen,
    };

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find((i) => i.id === producto.id);
    let nuevo;

    if (existe) {
      nuevo = carrito.map((i) =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
      );
    } else {
      nuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevo));
    window.dispatchEvent(new Event('storage'));
    addToCart(producto); 
    alert(`🎮 ${nombre} agregado al carrito`);
  };

  return (
    <div className="card bg-dark text-light border-neon h-100">
      <img
        src={imagen} 
        className="card-img-top"
        alt={nombre}
        style={{ height: '180px', objectFit: 'cover' }}
        
        // 👇 AQUÍ ESTÁ EL CAMBIO CLAVE: Usamos tu imagen local si falla la de internet
        onError={(e) => { 
            e.target.onerror = null; // Evita bucles infinitos
            e.target.src = "/assets/portadatienda.jpg"; 
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-info">{nombre}</h5>
        
        <p className="card-text small text-muted">
            {detalle.substring(0, 50)}{detalle.length > 50 ? "..." : ""}
        </p>

        <p className="card-text fs-4 fw-bold">${precio.toLocaleString()}</p>
        
        <button
          className="btn btn-outline-info w-100 mt-auto"
          onClick={agregarAlCarrito}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}