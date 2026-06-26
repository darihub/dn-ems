import Link from "next/link";
import {Empleado} from "@/types/empleado";
import BotonEliminar from "./BotonEliminar";

type Props = {
  empleados: Empleado[];
  onEliminado: () => void; // Para recargar la tabla
  esAdmin: boolean; // Solo los admin ven los botones de editar/eliminar
};

// Colores por departamento para hacerlo más visual
// Record se utiliza para definir la estructura de un obj, especificando el tipo de dato que tendran sus claves (keys)
// y sus valores (values)
const colorDepartamento: Record<string, string> = {
  "Tecnología": "bg-blue-100 text-blue-800",
  "Recursos Humanos": "bg-purple-100 text-purple-800",
  "Administración": "bg-gray-100 text-gray-800",
  "Ventas": "bg-green-100 text-green-800",
  "Marketing": "bg-pink-100 text-pink-800",
  "Operaciones": "bg-orange-100 text-orange-800",
};

export default function TablaEmpleados({empleados, onEliminado, esAdmin}: Props) {
  if (empleados.length == 0) { // si no hay empleados (longitud del array empleados es 0):
    return (
      <div className="text-center py-16 text-gray-500">
        No se encontraron empleados.
      </div>
    );
  }

  return ( // Si hay empleados cargados:
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">  {/*table define la tabla entera*/}
        <thead className="bg-gray-50"> {/*Representa la cabecera de la tabla; La fila con los encabezados.*/}
          <tr> {/*Fila de la tabla. Cada fila necesita un <tr>*/}
            {["Nombre", "Cargo", "Departamento", "Email", "Estado", "Acciones"].map((col) => ( // .map(col) llena con los datos automaticamente
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200"> {/*Contiene todas las filas con los datos reales*/}
          {empleados.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{emp.nombre}</div>
                <div className="text-sm text-gray-500">{emp.telefono}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{emp.cargo}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{emp.departamento}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {emp.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                {esAdmin ? ( // Si el usuario es admin, ve el botón de editar:
                  <div className="flex items-center gap-4">
                    <Link href={`/empleados/${emp.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Editar
                    </Link>
                    <BotonEliminar
                      id={emp.id}
                      nombre={emp.nombre}
                      onEliminado={onEliminado}
                    />
                  </div>
                  ) : ( // Si no es admin, ve el botón de ver:
                    <Link
                      href={`/empleados/${emp.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver
                    </Link>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}