"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Empleado } from "@/types/empleado";
import FormularioEmpleado from "@/components/FormularioEmpleado";
import PerfilEmpleado from "@/components/PerfilEmpleado";
import RutaProtegida from "@/components/RutaProtegida";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";


export default function PaginaEditarEmpleado({
  params,
}: {
  params: { id: string };
}) {
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const { rol } = useAuth();

  useEffect(() => {
    async function cargar() {
      const snap = await getDoc(doc(db, "empleados", params.id));
      if (snap.exists()) {
        setEmpleado({ id: snap.id, ...snap.data() } as Empleado);
      }
    }
    cargar();
  }, [params.id]);

  if (!empleado) return <Spinner/>;
  
 if (rol === "viewer") {
  return (
    <RutaProtegida>
      <PerfilEmpleado empleado={empleado} />
    </RutaProtegida>
  );
}
  //Le agrege el RutaProtegida al Formulario
  return(
    <RutaProtegida soloAdmin={true}>
        <FormularioEmpleado empleadoInicial={empleado} />
    </RutaProtegida>
  );
}