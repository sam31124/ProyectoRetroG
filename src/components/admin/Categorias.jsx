import React from "react";

export default function CategoriasAdmin({ consolas = [] }) {

  // Función segura para obtener el nombre (evita errores si viene vacío)
  const getNombre = (c) => (c.nombre || c.name || "").toUpperCase();
  const getPrecio = (c) => Number(c.precio || c.price || 0);

  // 🔰 Clasificación por categoría (Lógica segura)
  // Detectamos palabras clave como "Boy", "Advance", "Color" para saber si es portátil
  const portatiles = consolas.filter((c) =>
    ["BOY", "ADVANCE", "COLOR", "DS", "PSP", "SWITCH"].some(keyword => getNombre(c).includes(keyword))
  );

  const sobremesa = consolas.filter((c) =>
    !["BOY", "ADVANCE", "COLOR", "DS", "PSP", "SWITCH"].some(keyword => getNombre(c).includes(keyword))
  );

  return (
    <div className="card bg-dark border-neon p-4">
      <h4 className="text-info mb-4">📂 Gestión de Categorías</h4>

      {/* RESUMEN RÁPIDO */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-secondary border-0 p-3 text-light h-100">
            <h5>🎮 Consolas de Sobremesa</h5>
            <p className="mb-0">
              Total: <strong>{sobremesa.length}</strong>
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-secondary border-0 p-3 text-light h-100">
            <h5>🕹 Consolas Portátiles</h5>
            <p className="mb-0">
              Total: <strong>{portatiles.length}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* LISTA SOBREMESA */}
        <div className="col-md-6 mb-4">
          <h5 className="text-success border-bottom border-success pb-2">🎮 Sobremesa</h5>
          {sobremesa.length > 0 ? (
            <ul className="list-group">
              {sobremesa.map((c) => (
                <li key={c.id} className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between">
                  <span>{getNombre(c)}</span>
                  <span className="fw-bold text-success">${getPrecio(c).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No hay consolas de sobremesa.</p>
          )}
        </div>

        {/* LISTA PORTATILES */}
        <div className="col-md-6 mb-4">
          <h5 className="text-warning border-bottom border-warning pb-2">🕹 Portátiles</h5>
          {portatiles.length > 0 ? (
            <ul className="list-group">
              {portatiles.map((c) => (
                <li key={c.id} className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between">
                  <span>{getNombre(c)}</span>
                  <span className="fw-bold text-warning">${getPrecio(c).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No hay consolas portátiles.</p>
          )}
        </div>
      </div>
    </div>
  );
}