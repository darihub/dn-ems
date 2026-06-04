import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Empleado, EmpleadoNuevo } from "@/types/empleado";

// Referencia a la colección "empleados" en Firestore.
const empleadoRef = collection(db, "empleados");

// ─── READ ────────────────────────────────────────────────
// Trae todos los empleados, ordenados por nombre
export async function getEmpleados(): Promise<Empleado[]> {
  const q = query(empleadoRef, orderBy("nombre"));
  const snapshot = await getDocs(q);

  // snapshots.docs es un array de documentos de Firestore
  // Cada doc tiene un id y un método data() que devuelve los campos
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Empleado[];
}

// ─── CREATE ──────────────────────────────────────────────
// Recibe los datos sin id, Firebase genera el id solo
export async function crearEmpleado(empleado: EmpleadoNuevo): Promise<string> {
  const docRef = await addDoc(empleadoRef, empleado);
  return docRef.id; // Devuelve el id generado. Podemos utilizarlo para redirigir después
}

// ─── UPDATE ──────────────────────────────────────────────
// Recibe el id del empleado y los campos a modificar
// Partial<Empleado> significa "cualquier subconjunto de campos de Empleado"
export async function actualizarEmpleado(
  id: string,
  datos: Partial<Empleado>
): Promise<void> {
  const docRef = doc(db, "empleados", id);
  await updateDoc(docRef, datos);
}

// ─── DELETE ──────────────────────────────────────────────
export async function eliminarEmpleado(id: string): Promise<void> {
  const docRef = doc(db, "empleados", id);
  await deleteDoc(docRef);
}