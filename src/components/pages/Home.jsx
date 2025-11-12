import React from 'react';
import { useConsole } from '../../context/ConsoleContext';
import { useNavigate } from 'react-router-dom';
import ConsoleCard from '../molecules/ConsoleCard';
import '../../styles/main.css';

export default function Home() {
  const { consoles } = useConsole();
  const navigate = useNavigate();

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
              onClick={() => navigate('/productos')} // 👈 Ajusta esta ruta si tus productos están en otra página
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
            />
          </div>
        </div>
      </section>

      {/* 🔹 Sección de productos */}
      <section className="container mt-5">
        <h2 className="neon-title mb-4">Nuestros Productos</h2>
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

