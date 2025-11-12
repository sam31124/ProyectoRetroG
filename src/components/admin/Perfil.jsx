import React from "react";

export default function PerfilAdmin({ usuario }) {
  return (
    <div>
      <h4 className="text-info mb-3">Perfil del Administrador</h4>
      <p><strong>Nombre:</strong> {usuario?.nombre || "Administrador"}</p>
      <p><strong>Correo:</strong> {usuario?.correo}</p>
      <p><strong>Rol:</strong> Administrador</p>
    </div>
  );
}
