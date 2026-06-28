"use client";

import { useEffect, useState } from "react";

type Props = {
  mensaje: string;
  tipo: "exito" | "error";
  onCerrar: () => void;
};

export default function Notificacion({ mensaje, tipo, onCerrar }: Props) {
  useEffect(() => {
    // Se cierra automáticamente después de 3 segundos
    const timer = setTimeout(onCerrar, 3000);
    return () => clearTimeout(timer);
  }, [onCerrar]);

  const estilos = {
    exito: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border 
                     shadow-md text-sm font-medium ${estilos[tipo]}`}>
      {mensaje}
    </div>
  );
}