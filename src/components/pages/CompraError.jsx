import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

export default function CompraError() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-light vh-100 bg-dark"
      style={{
        background:
          "radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)",
      }}
    >
      <h1 className="neon-title text-danger mb-4"> Error en la compra</h1>
      <p className="fs-5 text-center" style={{ maxWidth: "500px" }}>
        Ocurrió un problema al procesar tu compra.  
        Es posible que tu carrito esté vacío o los datos del cliente no sean válidos.
      </p>

      <div className="mt-4">
        <button
          className="btn btn-outline-info me-3 border-neon"
          onClick={() => navigate("/carrito")}
        >
           Volver al carrito
        </button>
        <button
          className="btn btn-outline-light border-neon"
          onClick={() => navigate("/")}
        >
           Ir al inicio
        </button>
      </div>
    </div>
  );
}
