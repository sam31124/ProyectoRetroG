import React from 'react';
import { useConsoles } from '../../context/ConsoleContext';
import ConsoleCard from '../molecules/ConsoleCard';

export default function Home() {
  const { consoles } = useConsoles();

  return (
    <div className="text-center">
      <h1 className="neon-title mb-4">🕹️ Tienda de Consolas Retro</h1>
      <div className="row">
        {consoles.map(c => (
          <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <ConsoleCard consoleItem={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
