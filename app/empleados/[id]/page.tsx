"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Empleado } from "@/types/empleado";
import FormularioEmpleado from "@/components/FormularioEmpleado";
import RutaProtegida from "@/components/RutaProtegida";
import Spinner from "@/components/Spinner";
import { use } from "react";


export default function PaginaEditarEmpleado({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [empleado, setEmpleado] = useState<Empleado | null>(null);

  useEffect(() => {
    async function cargar() {
      const snap = await getDoc(doc(db, "empleados", id));
      if (snap.exists()) {
        setEmpleado({ id: snap.id, ...snap.data() } as Empleado);
      }
    }
    cargar();
  }, [id]);

  if (!empleado) return (
  <RutaProtegida soloAdmin={true}>
    <Spinner />
  </RutaProtegida>
  );

  return (
    <RutaProtegida soloAdmin={true}>
      <FormularioEmpleado empleadoInicial={empleado} />
    </RutaProtegida>
  );
}