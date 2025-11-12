import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";

describe("Componente App", () => {
  it('debería mostrar el texto "Learn React"', () => {
    const { getByText } = render();
    expect(getByText(/learn react/i)).toBeTruthy();
  });
});