import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsoleCard from '../molecules/ConsoleCard'; 
import ProductoService from '../../services/ProductoService';
import '../../styles/main.css';

export default function Home() {
  const navigate = useNavigate();
  // 1. INICIALIZAR SIEMPRE COMO ARRAY VACÍO []
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    ProductoService.getAllProductos()
      .then((response) => {
        console.log("📦 RESPUESTA DEL BACKEND:", response.data);
        
        // 2. LÓGICA INTELIGENTE PARA DETECTAR LA LISTA
        if (Array.isArray(response.data)) {
            setConsoles(response.data);
        } else if (response.data && Array.isArray(response.data.productos)) {
            setConsoles(response.data.productos);
        } else {
            console.warn("⚠️ Los datos no son una lista, usando array vacío.");
            setConsoles([]);
        }
      })
      .catch((error) => {
        console.error("❌ Error grave conectando al backend:", error);
        setConsoles([]); // En caso de error, lista vacía para no romper la web
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
              Descubre las consolas clásicas que definieron generaciones.
            </p>
            <button
              className="btn btn-primary mt-3 border-neon"
              onClick={() => navigate('/productos')}
            >
              Ver productos
            </button>
          </div>
          <div className="col-md-6 text-center">
             {/* Imagen decorativa */}
             <div className="p-5 border-neon text-light">
                <h3>🎮 Tienda Retro</h3>
             </div>
          </div>
        </div>
      </section>

      {/* 🔹 Sección de productos */}
      <section className="container mt-5">
        <h2 className="neon-title mb-4">Nuestros Productos</h2>
        
        {/* Mensaje si está cargando o vacío */}
        {(!consoles || consoles.length === 0) && (
            <div className="alert alert-info">
                Cargando productos o inventario vacío...
            </div>
        )}

        <div className="row justify-content-center">
          {/* 👇 AQUÍ ESTÁ EL BLINDAJE: Preguntamos si es array antes de hacer map */}
          {Array.isArray(consoles) && consoles.map((c) => (
            <div key={c.id || Math.random()} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              {/* Pasamos el objeto entero */}
              <ConsoleCard consoleItem={c} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}