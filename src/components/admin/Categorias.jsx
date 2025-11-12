import React from "react";

export default function CategoriasAdmin({ consolas }) {
  const portatiles = consolas.filter((c) => c.name.includes("Boy"));
  const sobremesa = consolas.filter((c) => !c.name.includes("Boy"));

  return (
    <div>
      <h4 className="text-info mb-3">Categorías de Consolas</h4>

      <div className="mb-4">
        <h5 className="text-success">🎮 Sobremesa</h5>
        <ul className="list-group bg-dark">
          {sobremesa.map((c) => (
            <li key={c.id} className="list-group-item bg-dark text-light border-neon">
              {c.name} - ${c.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-warning">🎮 Portátiles</h5>
        <ul className="list-group bg-dark">
          {portatiles.map((c) => (
            <li key={c.id} className="list-group-item bg-dark text-light border-neon">
              {c.name} - ${c.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
