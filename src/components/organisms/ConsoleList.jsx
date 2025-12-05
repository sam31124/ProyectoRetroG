import React, { useState, useEffect } from 'react';
import ConsoleCard from '../molecules/ConsoleCard'; // Asegúrate que esta ruta esté bien
import ProductoService from '../../services/ProductoService'; // Importamos el servicio
import '../../styles/main.css';

const ConsoleList = () => {
  // Estado para guardar los productos que vienen de la Base de Datos
  const [consoles, setConsoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect: Se ejecuta apenas carga la página
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    ProductoService.getAllProductos()
      .then(response => {
        console.log("Datos recibidos:", response.data); // Para depurar
        setConsoles(response.data); // Guardamos los datos en el estado
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando productos:", error);
        setLoading(false);
      });
  };

  if (loading) return <h2 className="text-center">Cargando catálogo...</h2>;

  return (
    <section className="console-list-container">
      <h2 className="section-title">Nuestras Consolas y Juegos</h2>
      <div className="console-grid">
        {consoles.map((consoleItem) => (
          <ConsoleCard 
            key={consoleItem.id} 
            // Pasamos los datos que vienen de la DB
            title={consoleItem.nombre} 
            price={consoleItem.precio}
            image={consoleItem.imagen_url}
            description={consoleItem.descripcion || "Sin descripción"}
          />
        ))}
      </div>
      
      {consoles.length === 0 && <p>No hay productos disponibles.</p>}
    </section>
  );
};

export default ConsoleList;