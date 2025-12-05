import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 👇 AQUÍ ESTABA EL ERROR, AHORA ESTÁ CORREGIDO
import ConsoleCard from '../molecules/ConsoleCard'; 
import ProductoService from '../../services/ProductoService';
import '../../styles/main.css';

export default function Home() {
  const navigate = useNavigate();
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    ProductoService.getAllProductos()
      .then((response) => {
        console.log("Datos de AWS:", response.data);
        setConsoles(response.data);
      })
      .catch((error) => {
        console.error("Error conectando al backend:", error);
      });
  }, []);

  return (
    <div className="text-center">
      {/* 🔹 Sección de bienvenida */}
      <section className="container mt-5 mb-5 text-start">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="neon-title mb-3">
              Bienvenido a <span className="text-info">RetroG</span>
            </h1>
            <p className="lead text-light">
              Descubre las consolas clásicas que definieron generaciones. Revive la
              nostalgia con un toque futurista y estilo neón.
            </p>
            <button
              className="btn btn-primary mt-3 border-neon"
              onClick={() => navigate('/productos')}
            >
              Ver productos
            </button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/assets/portadatienda.jpg"
              alt="Tienda Retro"
              className="img-fluid border-neon"
              style={{ borderRadius: '10px', maxHeight: '280px', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }} // Oculta si falla la imagen
            />
          </div>
        </div>
      </section>

      {/* 🔹 Sección de productos */}
      <section className="container mt-5">
        <h2 className="neon-title mb-4">Nuestros Productos (Desde AWS)</h2>
        
        {consoles.length === 0 && <p className="text-light">Cargando datos del servidor...</p>}

        <div className="row justify-content-center">
          {consoles.map((c) => (
            <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <ConsoleCard consoleItem={c} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}