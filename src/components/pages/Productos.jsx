import React, { useState, useEffect } from 'react';
import ConsoleCard from '../molecules/ConsoleCard';
import ProductoService from '../../services/ProductoService'; // 👇 Importamos el servicio real
import '../../styles/main.css';

export default function Productos() {
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 📡 Pedir datos a AWS
    ProductoService.getAllProductos()
      .then((response) => {
        setConsoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el catálogo:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="neon-title text-center mb-4">Catálogo Completo</h2>
      
      {/* Mensaje de carga */}
      {loading && (
        <div className="text-center text-info">
          <div className="spinner-border" role="status"></div>
          <p>Cargando inventario desde la nube...</p>
        </div>
      )}

      {/* Mensaje si no hay productos */}
      {!loading && consoles.length === 0 && (
        <p className="text-center text-muted">No hay productos disponibles en este momento.</p>
      )}

      {/* Grilla de Productos */}
      <div className="row justify-content-center">
        {consoles.map((c) => (
          <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            {/* ConsoleCard ya es inteligente y lee los datos de la BD */}
            <ConsoleCard consoleItem={c} />
          </div>
        ))}
      </div>
    </div>
  );
}