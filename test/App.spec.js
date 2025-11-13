import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renderiza algo en pantalla (smoke test)", () => {
    render(<App />);
    expect(screen.getByText(/Retro/i)).toBeTruthy();
  });
});
