import React from 'react';
import Button from '../atoms/Button';

export default function BlogCard({ blog }) {
  return (
    <div className="card bg-dark text-light border-neon h-100">
      <div className="card-body">
        <h4 className="card-title">{blog.titulo}</h4>
        <p className="card-text">{blog.descripcion}</p>
        <img
          src={blog.imagen}
          alt={blog.titulo}
          className="img-fluid my-3 border-neon rounded"
        />

        {/* El botón ahora abre el enlace externo */}
        <a
          href={blog.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary border-neon"
        >
          Ver caso
        </a>
      </div>
    </div>
  );
}

