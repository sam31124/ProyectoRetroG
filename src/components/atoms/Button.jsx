import React from 'react';

export default function Button({ children, className, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={className || 'btn btn-outline-info'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
