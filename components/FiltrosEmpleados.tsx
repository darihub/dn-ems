"use client";

import { Departamento } from "@/types/empleado";

type Props = {
  busqueda: string;
  departamento: string;
  onBusquedaChange: (valor: string) => void;
  onDepartamentoChange: (valor: string) => void;
};

const departamentos: Departamento[] = [
  "Tecnologia",
  "Recursos Humanos",
  "Administración",
  "Ventas",
  "Marketing",
  "Operaciones",
];

export default function FiltrosEmpleados({busqueda, departamento, onBusquedaChange, onDepartamentoChange}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/*Buscador por nombre*/}
      <input
        type="text"
        placeholder="Buscar por nombre o cargo..."
        value = {busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        className="flex-1 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/*Filtro por departamento*/}
      <select
        value={departamento}
        onChange={(e) => onDepartamentoChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos los departamentos</option>
        {departamentos.map((dep) => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
    </div>
  );
}

// Se dice que este componente se llama controlado: no maneja su propio estado, sino que recibe los valores
// y las funciones para cambiarlos desde afuera (desde la página padre). Eso hace que el filtrado sea fácil de
// implementar en la página.