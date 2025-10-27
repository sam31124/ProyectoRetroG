import React from 'react';
import Button from '../atoms/Button';

export default function ConsoleCard({ consoleItem }) {
  return (
    <div className="card bg-dark text-light border-neon">
      <img src={consoleItem.image} className="card-img-top" alt={consoleItem.name} />
      <div className="card-body">
        <h5 className="card-title">{consoleItem.name}</h5>
        <p className="card-text">{consoleItem.brand}</p>
        <p className="card-text">${consoleItem.price}</p>
        <Button className="btn btn-outline-info w-100">Agregar al carrito</Button>
      </div>
    </div>
  );
}
