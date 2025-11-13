import React from "react";

export default function UsuariosAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];

  return (
    <div>
      <h4 className="neon-title mb-3 text-center">👥 Usuarios Registrados</h4>

      {usuarios.length === 0 ? (
        <p className="text-light text-center">No hay usuarios registrados.</p>
      ) : (
        <table className="table table-dark table-striped table-bordered border-neon align-middle">
          <thead className="bg-dark">
            <tr>
              <th className="text-info">Nombre</th>
              <th className="text-info">Correo</th>
              <th className="text-info">Rol</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u, i) => (
              <tr key={i}>
                <td className="text-light">{u.nombre}</td>
                <td className="text-light">{u.correo}</td>
                <td>
                  {u.rol === "admin" ? (
                    <span className="badge bg-warning text-dark px-3 py-2">
                      Admin
                    </span>
                  ) : (
                    <span className="badge bg-info text-dark px-3 py-2">
                      Cliente
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
