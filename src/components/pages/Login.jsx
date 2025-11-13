import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.correo || !form.password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === form.correo && u.password === form.password
    );

    if (!usuario) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Guardar sesión del usuario
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Verificar si es administrador (correo @profesor.cl)
    if (form.correo.endsWith("@profesor.cl")) {
      alert(`👨‍🏫 Bienvenido Administrador, ${usuario.nombre || "Profesor"}!`);
      navigate("/admin");
    } else {
      alert(`🎮 Bienvenido, ${usuario.nombre || "Jugador"}!`);
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4"> Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit}
        className="border-neon p-4 bg-dark rounded mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="tuemail@ejemplo.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="********"
          />
        </div>
        <button className="btn btn-info w-100">Iniciar sesión</button>
        <p className="mt-3 text-center">
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => navigate("/registro")}
            style={{ color: "#00d8ff", cursor: "pointer" }}
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
}
