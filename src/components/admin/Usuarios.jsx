import React from "react";

export default function UsuariosAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];

  return (
    <div>
      <h4 className="text-info mb-3">Usuarios Registrados</h4>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, i) => (
              <tr key={i}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>
                  {u.rol === "admin" ? (
                    <span className="text-warning fw-bold">Administrador</span>
                  ) : (
                    <span className="text-info">Cliente</span>
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
