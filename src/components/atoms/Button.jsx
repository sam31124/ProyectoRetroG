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

        {/* Aquí usamos tu botón personalizado */}
        <Button
          className="btn btn-primary border-neon"
          onClick={() => window.open(blog.enlace, '_blank', 'noopener,noreferrer')}
        >
          Ver caso 
        </Button>
      </div>
    </div>
  );
}

