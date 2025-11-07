import React from 'react';
import { useConsole } from '../../context/ConsoleContext';
import ProductCard from '../molecules/ProductCard';
import '../../styles/main.css';

export default function Ofertas() {
  const { consoles } = useConsole();

  // filtra las consolas con una propiedad "offer" o "discount"
  const ofertas = consoles.filter(c => c.discount);

  return (
    <div className="container py-5 text-light">
      <h1 className="neon-title text-center mb-4">🔥 Ofertas Especiales 🔥</h1>
      <div className="row">
        {ofertas.length > 0 ? (
          ofertas.map((c) => (
            <div key={c.id} className="col-md-4 mb-4">
              <ProductCard product={c} />
            </div>
          ))
        ) : (
          <p className="text-center">No hay ofertas disponibles por ahora.</p>
        )}
      </div>
    </div>
  );
}
