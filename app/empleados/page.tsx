"use client";

import {useEffect, useState} from "react"; 
// useEffect se utiliza para indicarle a un componente que tieen uqe hacer algo después de renderizarse.
// React recuerda una función que le damos (llamada efecto) que llamará más tarde para actualizar la interfaz (actualizando el DOM)
import Link from "next/link";
import {getEmpleados} from "@/lib/empleados";
import {Empleado} from "@/types/empleado";
import TablaEmpleados from "@/components/TablaEmpleados";
import FiltrosEmpleados from "@/components/FiltrosEmpleados";

export default function PaginaEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [departamento, setDepartamento] = useState("");

  const esAdmin = true; // hardcodeo temporal, hasta implementar roles

  async function cargarEmpleados() {
    setCargando(true);
    try {
      const datos = await getEmpleados();
      setEmpleados(datos);
    } catch (error) {
      console.error("Error cargando empleados", error);
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta una sola vez cuando la página carga
  useEffect(() => {cargarEmpleados();}, []);

  // Filtrado en el cliente: no hace otra llamada a Firebase, filtra el array que ya está en memoria.
  const empleadosFiltrados = empleados.filter((emp) => {
    const coincideBusqueda = emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) || emp.cargo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideDepto = departamento === "" || emp.departamento === departamento;

    return coincideBusqueda && coincideDepto;
  });

  return (
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
  );
}