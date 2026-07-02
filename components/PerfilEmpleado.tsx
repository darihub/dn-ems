// components/PerfilEmpleado.tsx
import { Empleado } from "@/types/empleado";
import { useRouter } from "next/navigation";

export default function PerfilEmpleado({ empleado }: { empleado: Empleado }) {
  const router = useRouter();
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header con avatar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
          {empleado.nombre.split(" ").map(n => n.charAt(0)).join("").slice(0, 2)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{empleado.nombre}</h1>
          <p className="text-gray-500">{empleado.cargo}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block
                          ${empleado.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {empleado.activo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      {/* Datos en cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Email", valor: empleado.email },
          { label: "Teléfono", valor: empleado.telefono ?? "—" },
          { label: "Departamento", valor: empleado.departamento },
          { label: "Fecha de ingreso", valor: empleado.fechaIngreso },
          { label: "Salario", valor: `$${empleado.salario.toLocaleString()}` },
        ].map(({ label, valor }) => (
          <div key={label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="font-medium text-gray-900">{valor}</p>
          </div>
        ))}
      </div>

      <button onClick={() => router.back()}
        className="mt-6 border border-gray-300 text-gray-700 hover:bg-gray-50 
                   px-5 py-2 rounded-lg font-medium transition-colors">
        Volver
      </button>
    </div>
  );
}