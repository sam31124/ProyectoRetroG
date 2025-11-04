import React, { useState } from 'react';
import '../../styles/main.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setMensaje('⚠️ Todos los campos son obligatorios.');
      return;
    }

    // Simulación de envío
    alert('✅ Formulario enviado correctamente.');
    console.log('Datos enviados:', formData);

    // Limpiar formulario
    setFormData({ nombre: '', correo: '', mensaje: '' });
    setMensaje('');
  };

  return (
    <div className="container py-5 text-light">
      <h2 className="text-center mb-4">📬 Contáctanos</h2>
      <form onSubmit={handleSubmit} className="p-4 rounded bg-dark bg-opacity-75">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            name="mensaje"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Enviar
        </button>

        {mensaje && <p className="mt-3 text-warning text-center">{mensaje}</p>}
      </form>
    </div>
  );
}
