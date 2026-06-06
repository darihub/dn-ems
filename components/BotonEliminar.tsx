"use client"; // Componente se ejecuta en el navegador. Permite usar hooks (useState, useEffect, etc.) y manejar eventos del usuario
// (onClick, onChange, etc.).

import {useState} from "react";
import {eliminarEmpleado} from "@/lib/empleados"; // DELETE FROM empleados WHERE id = {id}

type Props = { // Son los atributos que recibe el componente React.
  id: string;
  nombre: string;
  onEliminado: () => void; // Callback para que la página refresque la lista
  // A las funciones de las props no se les define el comportamineto. Esto se hace cuando se llaman en otros archivos.
};

export default function BotonEliminar({id, nombre, onEliminado}: Props) { // Exportamos el componente usando desestructuración
  // variables de estado y las funciones para modificarlas:
  const [confirmando, setConfirmando] = useState(false); // confirmando = false
  const [cargando, setCargando] = useState(false); // cargando = false
  // estado actual -> confirmando
  // funcion para cambiarlo -> setConfirmando
  // setConfirmando(true) -> estado anterior = false & estado nuevo = true
  
  async function handleEliminar() { // pone cargando = true para deshabilitar el botón hasta que se elimine el empleado
    setCargando(true);
    try {
      await eliminarEmpleado(id);
      onEliminado(); // avisa a la página que recargue la lista
    } catch (error) {
      console.error("Error al eliminar: ", error);
    } finally {
      setCargando(false); // una vez se elimina, se habilita el botón haciendo cargando = false
      setConfirmando(false); // y se vuelve al botón "Eliminar" normal con confirmando = false
    }
  }


  // Estado normal: muestra botón rojo
  if (!confirmando) { // antes de tocar el botón, se muestra asi:
    return (
      <button
        onClick={() => setConfirmando(true)} // cuando lo presionamos, cambia al siguiente return
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Eliminar
      </button>
    );
  }

  // Estado de confirmación: muestra dos botones
  return ( // al presionar el botón, se muestra asi:
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">¿Eliminar a {nombre}?</span>
      <button
        onClick={handleEliminar}
        disabled={cargando} // mientras se está borrando el empleado, se deshabilita el botón
        className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm disabled:opacity-50"
      >
        {cargando ? "..." : "Si"} // si está borrandose, botón = "..." | si aún no elegimos Si o No, botón = "Si"
      </button>
      <button
        onClick={() => setConfirmando(false)} // si tocas No, el botón vuelve a su estado anterior: "Eliminar" (el return anterior)
        className="text-gray-600 hover:text-gray-800 px-2 py-1 border rounded text-sm"
      >
        No
      </button>
    </div>
  )

}

