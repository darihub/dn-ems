"use client";

import { useTema } from "@/context/TemaContext";

const temas = {
  marron: {
    fondo: "#2C1A0E",
    card: "#3D2410",
    borde: "#6B4226",
    texto: "#E8C99A",
    textoSecundario: "#C4956A",
  },
  vino: {
    fondo: "#1A0F12",
    card: "#261218",
    borde: "#5C2030",
    texto: "#D4889A",
    textoSecundario: "#C4788A",
  },
};

export default function TemaWrapper({ children }: { children: React.ReactNode }) {
  const { tema } = useTema();
  const colores = temas[tema];

  return (
    <div style={{
      backgroundColor: colores.fondo,
      minHeight: "100vh",
      color: colores.texto,
      "--color-card": colores.card,
      "--color-borde": colores.borde,
      "--color-texto": colores.texto,
      "--color-texto-secundario": colores.textoSecundario,
    } as React.CSSProperties}>
      {children}
    </div>
  );
}