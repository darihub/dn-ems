"use client"; // "Este componente debe renderizarse y ejecutarse del lado del cliente"
// Permite usar useEffect, onClick, onChange, etc.

import { Departamento } from "@/types/empleado";

type Props = { // propiedades que recibirá el componente:
  busqueda: string; // un texto de busqueda
  departamento: string; // un departamento seleccionado
  estado: string;
  onBusquedaChange: (valor: string) => void; // una función para cambiar la busqueda
  onDepartamentoChange: (valor: string) => void; // una función para cambiar el departamento
  onEstadoChange: (valor: string) => void;
};

const departamentos: Departamento[] = [ // este arreglo contiene elementos del tipo Departamento
  "Tecnologia",
  "Recursos Humanos",
  "Administración",
  "Ventas",
  "Marketing",
  "Operaciones",
];

// función que devuelve JSX. En React, los componentes son funciones.
// {busqueda, departamento, onBusquedaChange, onDepartamentoChange}: Props es "destructuring".
// Sino, se escribiria: function FiltrosEmpleados(props: Props) 
// y luego las cosas se llamarian como props.busqueda, props.departamento, etc.
export default function FiltrosEmpleados({busqueda, departamento, estado, onBusquedaChange, onDepartamentoChange, onEstadoChange}: Props) {
  return ( // comienza el JSX:
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/*Buscador por nombre*/}
      <input
        type="text" // campo de texto común
        placeholder="Buscar por nombre o cargo..." // texto gris que aparece cuando el campo está vacío
        value = {busqueda} // el valor que se va a buscar
        onChange={(e) => onBusquedaChange(e.target.value)} // Por si mismo, no cambia nada. Dice "el usuario escribio: <e.target.value>"
        className="flex-1 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      {/*Filtro por departamento*/}
      <select // desplegable HTML
        value={departamento} // valor seleccionado depende de la variable: departamento
        onChange={(e) => onDepartamentoChange(e.target.value)} // cuando elegis un dpto. ejecuta onDepartamentoChange(<eleccion>)
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Todos los departamentos</option> {/*opcion por defecto*/}
        {departamentos.map((dep) => ( // map() recorre cada elemento del array de departamentos para mostrarlo en la lista para elegir
          <option key={dep} value={dep}> {/*key es la forma de identificar cada elemento dentro de un map(). En este caso, como cada nombre de los dpto. es unico, usamos eso.*/}
            {dep}
          </option>
        ))}
      </select>
      {/*Filtro por estado (activo o inactivo)*/}
      <select value={estado} onChange={(e) => onEstadoChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900
                  [&>option]:bg-white [&>option]:text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Todos</option>
        <option value="activo">Activos</option>
        <option value="inactivo">Inactivos</option>
      </select>
    </div>
  );
}

// Se dice que este componente se llama controlado: no maneja su propio estado, sino que recibe los valores
// y las funciones para cambiarlos desde afuera (desde la página padre). Eso hace que el filtrado sea fácil de
// implementar en la página.