import React from "react";

export default function CategoriasAdmin({ consolas }) {

  // 🔰 Clasificación por categoría
  const portatiles = consolas.filter((c) =>
    ["Boy", "Advance", "Color"].some(keyword => c.name.includes(keyword))
  );

  const sobremesa = consolas.filter((c) =>
    !["Boy", "Advance", "Color"].some(keyword => c.name.includes(keyword))
  );

  return (
    <div>
      <h4 className="text-info mb-4">📂 Gestión de Categorías</h4>

      {/* RESUMEN RÁPIDO */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-dark border-neon p-3 text-light">
            <h5>🎮 Consolas de Sobremesa</h5>
            <p className="text-secondary">
              Total: <strong>{sobremesa.length}</strong>
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark border-neon p-3 text-light">
            <h5>🕹 Consolas Portátiles</h5>
            <p className="text-secondary">
              Total: <strong>{portatiles.length}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* LISTA SOBREMESA */}
      <div className="mb-4">
        <h5 className="text-success">🎮 Sobremesa</h5>
        <ul className="list-group bg-dark">
          {sobremesa.map((c) => (
            <li key={c.id} className="list-group-item bg-dark text-light border-neon">
              <strong>{c.name}</strong> — ${c.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* LISTA PORTATILES */}
      <div>
        <h5 className="text-warning">🕹 Portátiles</h5>
        <ul className="list-group bg-dark">
          {portatiles.map((c) => (
            <li key={c.id} className="list-group-item bg-dark text-light border-neon">
              <strong>{c.name}</strong> — ${c.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
