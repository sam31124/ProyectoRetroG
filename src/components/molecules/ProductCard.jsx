import React from 'react';
import { Link } from 'react-router-dom';
import ImageCard from '../atoms/ImageCard';

export default function ProductCard({ consola }) {
  return (
    <Link to={`/producto/${consola.id}`} className="text-decoration-none">
      <div className="card producto-card bg-dark border-neon h-100 text-center p-3">
        <ImageCard src={consola.image} alt={consola.name} height={180} />
        <h5 className="neon-text mt-3">{consola.name}</h5>
        <p className="fw-bold text-success">${consola.price}</p>
      </div>
    </Link>
  );
}
