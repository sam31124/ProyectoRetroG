import React, { createContext, useContext, useState } from 'react';
import * as consolesApi from '../data/consoles';

const ConsoleContext = createContext();

export function ConsoleProvider({ children }) {
  const [consoles, setConsoles] = useState(consolesApi.readAll());

  const addConsole = (item) => {
    consolesApi.create(item);
    setConsoles(consolesApi.readAll());
  };

  const editConsole = (id, changes) => {
    consolesApi.update(id, changes);
    setConsoles(consolesApi.readAll());
  };

  const deleteConsole = (id) => {
    consolesApi.remove(id);
    setConsoles(consolesApi.readAll());
  };

  return (
    <ConsoleContext.Provider value={{ consoles, addConsole, editConsole, deleteConsole }}>
      {children}
    </ConsoleContext.Provider>
  );
}

export function useConsoles() {
  return useContext(ConsoleContext);
}

