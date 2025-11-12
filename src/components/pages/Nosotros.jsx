import React from 'react';
import '../../styles/main.css';

export default function Nosotros() {
  return (
    <div className="nosotros-container container text-center mt-5 mb-5">
      <h1 className="fw-bold mb-4">Sobre Nosotros</h1>
      <p className="lead">
        <strong>ProductosG</strong> es un proyecto académico desarrollado como parte de nuestro aprendizaje en desarrollo web.
        El objetivo es aplicar los conocimientos de <em>HTML5, CSS y JavaScript</em> creando una tienda virtual enfocada en consolas retro de Nintendo.
      </p>
      <p>
        Este sitio no corresponde a una tienda real, sino que forma parte de una evaluación práctica en la que aprendemos a estructurar
        un sitio web, aplicar estilos y añadir funcionalidades interactivas.
      </p>

      <h3 className="fw-bold mt-5 mb-4">Los Desarrolladores</h3>
      <div className="row justify-content-center">
        <div className="col-md-3 m-2 card-dev">
          <h5 className="fw-bold">Samuelito Urzua</h5>
          <p>Encargado de la integración y funcionalidad con JavaScript.</p>
        </div>
        <div className="col-md-3 m-2 card-dev">
          <h5 className="fw-bold">Dan Jara</h5>
          <p>Responsable del diseño de la interfaz y los estilos en CSS.</p>
        </div>
        <div className="col-md-3 m-2 card-dev">
          <h5 className="fw-bold">Patricio Vergara</h5>
          <p>Encargado de la estructura HTML y la organización de las páginas.</p>
        </div>
      </div>

    </div>
  );
}
