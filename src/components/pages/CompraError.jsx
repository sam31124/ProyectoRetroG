import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompraError() {
  const navigate = useNavigate();
  const pedido = JSON.parse(localStorage.getItem('pedido')) || {};

  return (
    <div className="container mt-5 text-light">
      <div className="card bg-dark p-4">
        <div className="alert alert-danger text-dark">
          ❌ <strong>No se pudo realizar el pago</strong> — N° {pedido.numero || '20240705'}
        </div>

        <p>Ocurrió un error al procesar tu pago. Puedes intentar nuevamente.</p>
        <div className="text-center mt-3">
          <button className="btn btn-success me-2" onClick={() => navigate('/checkout')}>
            Volver a intentar el pago
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
}
