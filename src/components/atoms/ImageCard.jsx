import React from 'react';
import '../../styles/main.css';

export default function ImageCard({ src, alt, height = 100 }) {
  // Si no hay imagen, usar un fondo gris como placeholder
  const imagePath = src ? src : '/assets/placeholder.png';

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-dark border-neon rounded"
      style={{
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      <img
        src={imagePath}
        alt={alt || 'Imagen del producto'}
        className="img-fluid"
        style={{
          objectFit: 'contain',
          maxHeight: '100%',
          maxWidth: '100%',
        }}
        onError={(e) => {
          // Si la imagen no existe, muestra un cuadro vacío
          e.target.onerror = null;
          e.target.src = '/assets/placeholder.png';
        }}
      />
    </div>
  );
}
