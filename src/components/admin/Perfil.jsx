import React from "react";
import { FaUserShield, FaEnvelope, FaIdBadge } from "react-icons/fa";

export default function PerfilAdmin({ usuario }) {
  return (
    <div className="container text-light">

      <h4 className="text-info mb-4">👤 Perfil del Administrador</h4>

      <div className="card bg-dark border-neon p-4 shadow-lg">

        {/* Header con icono */}
        <div className="d-flex align-items-center mb-3">
          <FaUserShield size={40} className="text-info me-3" />
          <h5 className="fw-bold mb-0 text-white">
            {usuario?.nombre || "Administrador del Sistema"}
          </h5>
        </div>

        <hr className="border-secondary" />

        {/* Correo */}
        <p className="mb-2 text-white">
          <FaEnvelope className="text-warning me-2" />
          <strong>Correo:</strong> {usuario?.correo || "—"}
        </p>

        {/* Rol */}
        <p className="mb-2 text-white">
          <FaIdBadge className="text-success me-2" />
          <strong>Rol:</strong> Administrador
        </p>

        {/* descripción */}
        <p className="mt-3 text-light">
          Este usuario tiene permisos completos para gestionar productos,
          usuarios, categorías, reportes y configuración del sistema.
        </p>
      </div>
    </div>
  );
}
