"use client";

import {useState} from "react";
import {useRouter} from "next/navigation"; // PERMITE NAVEGAR Entre paginas
import { EmpleadoNuevo, Empleado, Departamento } from "@/types/empleado";
import { crearEmpleado, actualizarEmpleado } from "@/lib/empleados";
import Notificacion from "./Notificacion";

type Props = {
  empleadoInicial?: Empleado; // si viene es edición, si no es creación
  soloLectura?: boolean; // permite ver el formulario a los usuarios no admin
};

const departamentos: Departamento[] = [
  "Tecnologia", "Recursos Humanos", "Administración", "Ventas", "Marketing", "Operaciones",
];

const empleadoVacio: EmpleadoNuevo = { // objeto con valores iniciales
  nombre: "", email: "", cargo: "", telefono: "", departamento: "Tecnología", // revisar dps
  fechaIngreso: "", salario: 0, activo: true,
};

export default function FormularioEmpleado({empleadoInicial, soloLectura = false}: Props) {
  const router = useRouter();
  const esEdicion = !!empleadoInicial; // !! convierte valor (empleadoInicial) a booleano.
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: "exito" | "error";
  } | null>(null);

  // Si hay empleadoInicial, usamos sus datos. Si no, el formulario vacío.
  const [form, setForm] = useState<EmpleadoNuevo>(
    empleadoInicial
      ? { nombre: empleadoInicial.nombre, email: empleadoInicial.email,
          cargo: empleadoInicial.cargo, departamento: empleadoInicial.departamento,
          fechaIngreso: empleadoInicial.fechaIngreso, salario: empleadoInicial.salario,
          activo: empleadoInicial.activo, telefono: empleadoInicial.telefono }
      : empleadoVacio
  );

  const [errores, setErrores] = useState<Partial<Record<keyof EmpleadoNuevo, string>>>({});
  const [guardando, setGuardando] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const {name, value, type} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" 
        ? (e.target as HTMLInputElement).checked
        : name === "salario" ? Number(value) : value,
    }));
  }

  function validar(): boolean {
    const nuevosErrores: Partial<Record<keyof EmpleadoNuevo, string>> = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.email.includes("@")) nuevosErrores.email = "Email inválido";
    if (!form.cargo.trim()) nuevosErrores.cargo = "El cargo es obligatorio";
    if (!form.fechaIngreso) nuevosErrores.fechaIngreso = "La fecha es obligatoria";
    if (form.salario <= 0) nuevosErrores.salario = "El salario debe ser mayor a 0";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;
    setGuardando(true);
    try {
      if (esEdicion) {
        await actualizarEmpleado(empleadoInicial!.id, form);
      } else {
        await crearEmpleado(form);
      }
      setNotificacion({ mensaje: "Empleado guardado correctamente", tipo: "exito" });
      setTimeout(() => router.push("/empleados"), 1500); // Redirige después de mostrar el mensaje
    } catch (error) {
      setNotificacion({ mensaje: "Error al guardar. Intentá de nuevo.", tipo: "error" });
    } finally {
      setGuardando(false);
    }
  }

  // Helper para no repetir clases en cada campo
  const inputClass = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <>
      {notificacion && (
        <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} onCerrar={() => setNotificacion(null)}/>
      )}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          {esEdicion ? "Editar empleado" : "Nuevo empleado"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nombre completo *
            </label>
            <input name="nombre" value={form.nombre} onChange={handleChange}
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`} 
              placeholder="Ana García"
              readOnly = {soloLectura} />
            {errores.nombre && <p className={errorClass}>{errores.nombre}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email *
            </label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`} 
              placeholder="ana@empresa.com"
              readOnly = {soloLectura} />
            {errores.email && <p className={errorClass}>{errores.email}</p>}
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Cargo *
            </label>
            <input name="cargo" value={form.cargo} onChange={handleChange}
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`} 
              placeholder="Desarrolladora"
              readOnly = {soloLectura} />
            {errores.cargo && <p className={errorClass}>{errores.cargo}</p>}
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Departamento *
            </label>
            <select name="departamento" value={form.departamento} onChange={handleChange}
            disabled = {soloLectura} 
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`} >
              {departamentos.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Fecha de ingreso */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Fecha de ingreso *
            </label>
            <input name="fechaIngreso" type="date" value={form.fechaIngreso}
              onChange={handleChange} 
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`}
              readOnly = {soloLectura}  />
            {errores.fechaIngreso && <p className={errorClass}>{errores.fechaIngreso}</p>}
          </div>

          {/* Salario */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Salario *
            </label>
            <input name="salario" type="number" value={form.salario}
              onChange={handleChange} 
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`}
              readOnly = {soloLectura}
              min={0} />
            {errores.salario && <p className={errorClass}>{errores.salario}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Teléfono
            </label>
            <input name="telefono" value={form.telefono ?? ""} onChange={handleChange}
              className={`${inputClass} ${soloLectura ? "bg-gray-50 text-gray-400 cursor-not-allowed bg-white" : "bg-white"}`}  
              placeholder="+54 11 1234-5678"
              readOnly = {soloLectura} />
          </div>

          {/* Activo */}
          <div className="flex items-center mt-6">
            <input name="activo" type="checkbox" checked={form.activo}
              onChange={handleChange} className={`${inputClass} ${soloLectura ? "w-4 h-4 accent-blue-600" : ""}`}
              disabled = {soloLectura}  />
            <label className="text-sm font-medium text-white">
              Empleado activo
            </label>
          </div>
        </div>

        {/* Botones */}
        {!soloLectura && (
          <div className="flex gap-3 mt-8">
            <button type="submit" disabled={guardando}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 
                        rounded-lg font-medium disabled:opacity-50 transition-colors ">
              {guardando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear empleado"}
            </button>
            <button type="button" onClick={() => router.back()}
              className="border border-gray-300 text-gray-400 hover:bg-gray-50 
                        px-6 py-2 rounded-lg font-medium transition-colors">
              Cancelar
            </button>
          </div>
        )}
        {/*Si es solo lectura, mostrar boton de volver simple */}
        {soloLectura && (
          <div className="mt-8">
            <button type="button" onClick={() => router.back()}
              className="border border-gray-300 text-gray-400 hover:bg-gray-50 
                        px-6 py-2 rounded-lg font-medium transition-colors">
              Volver
            </button>
          </div>
        )}

      </form>
  </>
  );
}
