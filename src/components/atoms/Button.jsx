import React from "react";

export default function Button({ text, onClick, className = "", children }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
}
