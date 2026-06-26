"use client";

import {useEffect, useState} from "react"; 
// useEffect se utiliza para indicarle a un componente que tieen uqe hacer algo después de renderizarse.
// React recuerda una función que le damos (llamada efecto) que llamará más tarde para actualizar la interfaz (actualizando el DOM)
import Link from "next/link";
import {getEmpleados} from "@/lib/empleados";
import {Empleado} from "@/types/empleado";
import TablaEmpleados from "@/components/TablaEmpleados";
import FiltrosEmpleados from "@/components/FiltrosEmpleados";
import RutaProtegida from "@/components/RutaProtegida";

export default function PaginaEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]); // guarda un array
  const [cargando, setCargando] = useState(true); // guarda un booleano
  const [busqueda, setBusqueda] = useState(""); // guarda un string.
  const [departamento, setDepartamento] = useState(""); // guarda un string.

  const esAdmin = true; // hardcodeo temporal, hasta implementar roles

  async function cargarEmpleados() { // Función async permite que React siga funcionando mientras espera la respuesta.
    setCargando(true); // hace que cargando = true. Esconde la tabla de empleados y muestra el html de "Cargando empleados..."
    try {
      const datos = await getEmpleados();
      setEmpleados(datos); // hace que empleados = [Juan, Ana, Pedro, ...]
    } catch (error) {
      console.error("Error cargando empleados", error);
    } finally {
      setCargando(false); // Vuelve a mostrar la tabla de empleados.
    }
  }

  // Se ejecuta una sola vez cuando la página carga
  useEffect(() => {cargarEmpleados();}, []);
  // useEffect() solo se ejecuta al cambiar el array de dependencias. Al estar vacio (es decir, []), está indicando que 
  // este useEffect() no depende de nada, y debe ejecutarse una vez sola.

  // Filtrado en el cliente: no hace otra llamada a Firebase, filtra el array que ya está en memoria.
  const empleadosFiltrados = empleados.filter((emp) => {
    const coincideBusqueda = emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) || emp.cargo.toLowerCase().includes(busqueda.toLowerCase());
    // includes significa que incluye al menos una parte de lo que se busca. Es decir, si buscas "Juan", busqueda tiene parte de "Juan Perez".
    const coincideDepto = departamento === "" || emp.departamento === departamento;
    // Si no se especifica un departamento, se muestran todos los empleados. Si se ingresa un dpto. se muestran solo los empleados de ese dpto.

    return coincideBusqueda && coincideDepto;
  });

  return (
    <RutaProtegida>
      <div className="max-w-7x1 mx-auto px-4 py-8">
        {/*Encabezado*/}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2x1 font-bold text-gray-900">Empleados</h1>
            <p className="text-gray-500 text-sm mt-1">
              {empleadosFiltrados.length} de {empleados.length} empleados
            </p>
          </div>
          {esAdmin && (
            <Link href="/empleados/nuevo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              + Nuevo empleado
            </Link>
          )}
        </div>
        {/*Filtros*/}
        <FiltrosEmpleados busqueda={busqueda} departamento={departamento} onBusquedaChange={setBusqueda} onDepartamentoChange={setDepartamento}/>
        {/* Tabla o estado de carga */}
        {cargando ? (
          <div className="text-center py-16 text-gray-500">
            Cargando empleados...
          </div>
        ):(
          <TablaEmpleados empleados={empleadosFiltrados} onEliminado={cargarEmpleados} esAdmin={esAdmin}/>
        ) }
      </div>
    </RutaProtegida>   
  );
}