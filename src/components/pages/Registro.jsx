import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, password } = formData;

    // Validación
    if (!nombre || !correo || !password) {
      setMensaje({ tipo: "error", texto: "Por favor completa todos los campos." });
      return;
    }

    if (password.length < 6) {
      setMensaje({ tipo: "error", texto: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    // Cargar usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];

    // Verificar duplicado
    if (usuarios.find(u => u.correo === correo)) {
      setMensaje({ tipo: "error", texto: "Ya existe un usuario con ese correo." });
      return;
    }

    // Asignar rol
    const rol = correo.endsWith("@profesor.cl") ? "admin" : "cliente";

    const nuevoUsuario = { nombre, correo, password, rol };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios_retroG", JSON.stringify(usuarios));

    setMensaje({ tipo: "exito", texto: "Registro exitoso. Redirigiendo al login..." });

    const delay = window.__TEST__ ? 0 : 1500;

setTimeout(() => {
  navigate("/login");
}, delay);

  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center mb-4 neon-title"> Registro de Usuario</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-neon rounded-3 shadow-lg bg-dark"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre completo*</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico*</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {mensaje.texto && (
          <div
            className={`alert ${
              mensaje.tipo === "error" ? "alert-danger" : "alert-success"
            } mt-3`}
          >
            {mensaje.texto}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3 border-neon">
          Registrarse 
        </button>
      </form>
    </div>
  );
}
