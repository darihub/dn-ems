import {
  collection, // referencia una colección.
  getDocs, // obtiene documentos.
  addDoc, // crea documentos.
  updateDoc, // modifica documentos.
  deleteDoc, // elimina documentos.
  doc, // referencia un documento específico.
  query, // construye consultas.
  orderBy, // ordena resultados
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // importa la conexión a firebase
import { Empleado, EmpleadoNuevo } from "@/types/empleado"; // importa los tipos (types) de TypeScript

// Referencia a la colección "empleados" en Firestore. Es como guardar una tabla de la BD en una variable
const empleadoRef = collection(db, "empleados");

// ─── READ ────────────────────────────────────────────────
// Trae todos los empleados, ordenados por nombre
export async function getEmpleados(): Promise<Empleado[]> { 
  // Promise<Empleado[]>: cuando termine de ejecutar la función, devolveré un arreglo de empleados (Empleado[])
  const q = query(empleadoRef, orderBy("nombre")); // SELECT * FROM empleados ORDER BY nombre
  const snapshot = await getDocs(q); // Ejecuta la query "q"

  // snapshots.docs es un array de documentos de Firestore
  // Cada doc tiene un id y un método data() que devuelve los campos
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // carga todos los datos de empleado. "Confia, es un empleado"
  })) as Empleado[];
}

// ─── CREATE ──────────────────────────────────────────────
// Recibe los datos sin id, Firebase genera el id solo (Recibe un empleado nuevo)
export async function crearEmpleado(empleado: EmpleadoNuevo): Promise<string> {
  const docRef = await addDoc(empleadoRef, empleado); // INSERT INTO empleados (...)
  return docRef.id; // Devuelve el id generado. Podemos utilizarlo para redirigir después (ej, ir a empleados/id)
}

// ─── UPDATE ──────────────────────────────────────────────
// Recibe el id del empleado y los campos a modificar
// Partial<Empleado> significa "cualquier subconjunto de campos de Empleado"
// Al llamar por Partial, todos los campos que se ingresan pasan a ser opcionales. Ejemplo: nombre? edad?
// Podemos llamar la función y solo enviamos los datos a cambiar.
export async function actualizarEmpleado(
  id: string,
  datos: Partial<Empleado>
): Promise<void> { // como no devuelve nada, prometemos un void
  const docRef = doc(db, "empleados", id); // obtiene referencia al documento del empleado correspondiente
  await updateDoc(docRef, datos); // actualiza unicamente los campos enviados.
}

// ─── DELETE ──────────────────────────────────────────────
export async function eliminarEmpleado(id: string): Promise<void> { // como no devuelve nada, prometemos un void
  const docRef = doc(db, "empleados", id);
  await deleteDoc(docRef); // DELETE FROM empleados WHERE id = (id: string)
}