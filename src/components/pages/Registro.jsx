import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; // 1. Importamos el servicio
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

  // 2. Convertimos la función a ASYNC para esperar al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, correo, password } = formData;
    setMensaje({ tipo: "", texto: "" });

    // Validación básica
    if (!nombre || !correo || !password) {
      setMensaje({ tipo: "error", texto: "Por favor completa todos los campos." });
      return;
    }

    if (password.length < 6) {
      setMensaje({ tipo: "error", texto: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    try {
      // 3. Determinar rol (Lógica de negocio)
      const rol = correo.endsWith("@profesor.cl") ? "admin" : "cliente";

      // 4. ENVÍO REAL AL BACKEND (Adiós LocalStorage)
      await AuthService.register(nombre, correo, password, rol);

      // Si no hay error, mostramos éxito
      setMensaje({ tipo: "exito", texto: "Registro exitoso en la Base de Datos. Redirigiendo..." });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Error en registro:", error);
      // Si el backend dice que ya existe
      if (error.response && error.response.status === 400) {
         setMensaje({ tipo: "error", texto: "Este correo ya está registrado." });
      } else {
         setMensaje({ tipo: "error", texto: "Error al conectar con el servidor." });
      }
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center mb-4 neon-title">Registro de Usuario (Real)</h2>

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