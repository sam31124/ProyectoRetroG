import React from "react";

export default function ReportesAdmin({ consolas }) {
  const promedio = (
    consolas.reduce((acc, p) => acc + p.price, 0) / consolas.length
  ).toFixed(0);

  return (
    <div>
      <h4 className="text-info mb-3">Reportes</h4>
      <p>💰 Precio promedio de consolas: ${Number(promedio).toLocaleString()}</p>
      <p>🎮 Total de consolas registradas: {consolas.length}</p>
      <p>📦 Portátiles: {consolas.filter((c) => c.name.includes("Boy")).length}</p>
      <p>🖥️ Sobremesa: {consolas.filter((c) => !c.name.includes("Boy")).length}</p>
    </div>
  );
}
