import React, { useState } from 'react';
import { useConsole } from '../../context/ConsoleContext';
import Button from '../atoms/Button';
import '../../styles/main.css';

export default function AdminPanel() {
  const { consoles } = useConsole();
  const [productos, setProductos] = useState(consoles);

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="container py-5 text-light">
      <h1 className="neon-title text-center mb-4">Panel de Administración</h1>
      <table className="table table-dark table-striped border-neon">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>${p.price}</td>
              <td>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
