"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Empleado } from "@/types/empleado";
import FormularioEmpleado from "@/components/FormularioEmpleado";
import PerfilEmpleado from "@/components/PerfilEmpleado";
import RutaProtegida from "@/components/RutaProtegida";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";


export default function PaginaEmpleado({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const { rol } = useAuth();

  useEffect(() => {
    async function cargar() {
      const snap = await getDoc(doc(db, "empleados", id));
      if (snap.exists()) {
        setEmpleado({ id: snap.id, ...snap.data() } as Empleado);
      }
    }
    cargar();
  }, [id]);

  // Mientras carga, respetar el rol para el spinner también
  if (!empleado) {
    return rol === "viewer" ? (
      <RutaProtegida>
        <Spinner />
      </RutaProtegida>
    ) : (
      <RutaProtegida soloAdmin={true}>
        <Spinner />
      </RutaProtegida>
    );
  }

  if (rol === "viewer") {
    return (
      <RutaProtegida>
        <FormularioEmpleado empleadoInicial={empleado} soloLectura={true} />
      </RutaProtegida>
    );
  }

  return (
    <RutaProtegida soloAdmin={true}>
      <FormularioEmpleado empleadoInicial={empleado} />
    </RutaProtegida>
  );
}