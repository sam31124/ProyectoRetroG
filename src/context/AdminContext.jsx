import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [vista, setVista] = useState("dashboard");

  return (
    <AdminContext.Provider value={{ vista, setVista }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
