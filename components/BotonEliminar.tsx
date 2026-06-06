"use client";

import {useState} from "react";
import {eliminarEmpleado} from "@/lib/empleados";

type Props = {
  id: string;
  nombre: string;
  onEliminado: () => void; // Callback para que la página refresque la lista 
};

export default function BotonEliminar({id, nombre, onEliminado}: Props) {
  const [confirmando, setConfirmando] = useState(false);
  const [cargando, setCargando] = useState(false);

  
  async function handleEliminar() {
    setCargando(true);
    try {
      await eliminarEmpleado(id);
      onEliminado(); // avisa a la página que recargue la lista
    } catch (error) {
      console.error("Error al eliminar: ", error);
    } finally {
      setCargando(false);
      setConfirmando(false);
    }
  }


  // Estado normal: muestra botón rojo
  if (!confirmando) {
    return (
      <button
        onClick={() => setConfirmando(true)}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Eliminar
      </button>
    );
  }

  // Estado de confirmación: muestra dos botones
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">¿Eliminar a {nombre}?</span>
      <button
        onClick={handleEliminar}
        disabled={cargando}
        className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm disabled:opacity-50"
      >
        {cargando ? "..." : "Si"}
      </button>
      <button
        onClick={() => setConfirmando(false)}
        className="text-gray-600 hover:text-gray-800 px-2 py-1 border rounded text-sm"
      >
        No
      </button>
    </div>
  )

}

