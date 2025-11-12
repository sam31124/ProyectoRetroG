import React from "react";

export default function ProductosAdmin({ consolas }) {
  return (
    <div>
      <h4 className="text-info mb-3">Gestión de Consolas</h4>
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {consolas.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>${p.price.toLocaleString()}</td>
              <td>{p.name.includes("Boy") ? "Portátil" : "Sobremesa"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
