"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Tema = "marron" | "vino";

type TemaContextType = {
  tema: Tema;
  toggleTema: () => void;
};

const TemaContext = createContext<TemaContextType>({
  tema: "marron",
  toggleTema: () => {},
});

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>("marron");

  useEffect(() => {
    const guardado = localStorage.getItem("tema") as Tema;
    if (guardado) setTema(guardado);
  }, []);

  function toggleTema() {
    const nuevo: Tema = tema === "marron" ? "vino" : "marron";
    setTema(nuevo);
    localStorage.setItem("tema", nuevo);
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}