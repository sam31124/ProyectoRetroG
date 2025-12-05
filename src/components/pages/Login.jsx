import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; // Importamos el servicio nuevo
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    if (!form.correo || !form.password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      // 🚀 CONEXIÓN REAL AL BACKEND
      // Le pasamos (correo, password) al servicio
      const data = await AuthService.login(form.correo, form.password);
      
      // Si llegamos aquí, el login fue exitoso
      const usuario = data.user;

      // 🔔 Notificar al Navbar que hubo cambios (Igual que antes)
      window.dispatchEvent(new Event("usuarioActualizado"));

      // 🚦 LÓGICA DE REDIRECCIÓN POR ROLES (Desde la Base de Datos)
      if (usuario.rol === 'admin') {
        alert(`👨‍🏫 Bienvenido Jefe, ${usuario.nombre}!`);
        navigate("/admin/dashboard"); // O la ruta que tengas para admin
      } else if (usuario.rol === 'vendedor') {
        alert(`💼 Turno de ventas iniciado, ${usuario.nombre}.`);
        navigate("/ventas"); // O donde vean las órdenes
      } else {
        alert(`🎮 ¡A jugar! Bienvenido ${usuario.nombre}.`);
        navigate("/");
      }

    } catch (err) {
      console.error("Error login:", err);
      // Si el backend responde error (ej: 401), lo mostramos
      if (err.response && err.response.status === 401) {
        setError("Correo o contraseña incorrectos");
      } else {
        setError("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4">Iniciar Sesión (Real)</h2>
      <form
        onSubmit={handleSubmit}
        className="border-neon p-4 bg-dark rounded mx-auto"
        style={{ maxWidth: "400px" }}
      >
        {error && <div className="alert alert-danger text-center">{error}</div>}
        
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="cliente@tienda.com"
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