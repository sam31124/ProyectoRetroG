import React from 'react';
import ImageCard from '../atoms/ImageCard';

export default function ProductCard({ consola }) {
  return (
    <div className="card producto-card bg-dark border-neon h-100 text-center p-3">
      <ImageCard src={consola.imagen} alt={consola.nombre} height={180} />
      <h5 className="neon-text mt-3">{consola.nombre}</h5>
      <p className="small">{consola.descripcion}</p>
      <p className="fw-bold text-success">${consola.precio}</p>
    </div>
  );
}