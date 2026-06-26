"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Empleado } from "@/types/empleado";
import FormularioEmpleado from "@/components/FormularioEmpleado";
import RutaProtegida from "@/components/RutaProtegida";


export default function PaginaEditarEmpleado({
  params,
}: {
  params: { id: string };
}) {
  const [empleado, setEmpleado] = useState<Empleado | null>(null);

  useEffect(() => {
    async function cargar() {
      const snap = await getDoc(doc(db, "empleados", params.id));
      if (snap.exists()) {
        setEmpleado({ id: snap.id, ...snap.data() } as Empleado);
      }
    }
    cargar();
  }, [params.id]);

  if (!empleado) return <div className="p-8 text-gray-500">Cargando...</div>;
  //Le agrege el RutaProtegida al Formulario
  return(
    <RutaProtegida soloAdmin={true}>
        <FormularioEmpleado empleadoInicial={empleado} />
    </RutaProtegida>
  );
}