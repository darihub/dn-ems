// app/page.tsx
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Home() {
  try {
    // Intenta leer la colección "empleados" (va a estar vacía, pero no debe dar error)
    const snapshot = await getDocs(collection(db, "empleados"));
    console.log("Firebase conectado. Documentos:", snapshot.size);
  } catch (error) {
    console.error("Error conectando Firebase:", error);
  }

  return (
    <main>
      <h1>Sistema de Empleados</h1>
      <p>Firebase configurado. Ver consola del navegador.</p>
    </main>
  );
}