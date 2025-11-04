import React from 'react';
import '../../styles/main.css';

export default function ConsoleCard({ consoleItem }) {
  // Permite compatibilidad tanto con "name" como con "nombre"
  const nombre = consoleItem.name || consoleItem.nombre;
  const marca = consoleItem.brand || consoleItem.categoria;
  const precio = consoleItem.price || consoleItem.precio;
  const imagen = consoleItem.image || consoleItem.imagen;

  return (
    <div className="producto-card border-neon p-3 text-center">
      {/* Imagen */}
      <img
        src={imagen}
        alt={nombre}
        className="img-fluid mb-3"
        style={{
          height: '150px',
          width: '100%',
          objectFit: 'contain',
          borderRadius: '10px'
        }}
      />

      {/* 🎮 Información */}
      <h5 className="neon-text">{nombre}</h5>
      <p className="text-light mb-1">{marca}</p>
      <p className="text-info fw-bold mb-2">${precio}</p>

      {/*Botón */}
      <button className="btn btn-outline-info w-100 border-neon">
        Añadir al carrito
      </button>
    </div>
  );
}
