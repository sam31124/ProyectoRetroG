import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Cargar usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];

    console.log("Usuarios guardados:", usuarios); // 👀 que miedo yo me void          para debug
    console.log("Intento de login:", correo, password);

    // Buscar coincidencia exacta de correo y contraseña
    const usuario = usuarios.find(
      (u) => u.correo.trim() === correo.trim() && u.password === password
    );

    if (!usuario) {
      setMensaje("Correo o contraseña incorrectos.");
      return;
    }

    // Guardar sesión
    localStorage.setItem("usuario_activo", JSON.stringify(usuario));

    // Redirigir según el rol
    if (usuario.rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center mb-4 neon-title"> Iniciar Sesión</h2>

      <form
        onSubmit={handleLogin}
        className="p-4 border-neon rounded-3 shadow-lg bg-dark"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {mensaje && <div className="alert alert-danger mt-3">{mensaje}</div>}

        <button type="submit" className="btn btn-success w-100 mt-3 border-neon">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

