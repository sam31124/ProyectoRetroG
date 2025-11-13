import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from '../atoms/ImageCard';

export default function ProductCard({ consola, product, onAdd }) {
  
  // 👉 Compatibilidad: si viene "product" desde el test, úsalo.
  const data = consola || product;

  if (!data) return null; // Evita errores en los tests

  return (
    <div className="card producto-card bg-dark border-neon h-100 text-center p-3">

      {/* Imagen */}
      <Link to={`/producto/${data.id}`} className="text-decoration-none">
        <ImageCard src={data.image} alt={data.name} height={180} />
        <h5 className="neon-text mt-3">{data.name}</h5>
        <p className="fw-bold text-success">${data.price}</p>
      </Link>

      {/* Botón para los tests */}
      {onAdd && (
        <button
          className="btn btn-outline-info mt-2"
          onClick={() => onAdd(data)}
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
}
