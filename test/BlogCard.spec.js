import React from "react";
import { render, screen } from "@testing-library/react";
import BlogCard from "../src/components/molecules/BlogCard";

describe("BlogCard", () => {
  const mockBlog = {
    titulo: "Blog NES",
    descripcion: "Historia de la Famicom",
    imagen: "/assets/products/nes.jpg",
  };

  it("muestra el título", () => {
    render(<BlogCard blog={mockBlog} />);
    expect(screen.getByText("Blog NES")).toBeTruthy();
  });

  it("muestra la descripción", () => {
    render(<BlogCard blog={mockBlog} />);
    expect(screen.getByText("Historia de la Famicom")).toBeTruthy();
  });
});
