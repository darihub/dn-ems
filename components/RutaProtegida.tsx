
"use client";

//Imports
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Props
type Props = {
  children: React.ReactNode;
  soloAdmin?: boolean; // Si es true, solo admins pueden entrar
};

export default function RutaProtegida({ children, soloAdmin = false }: Props) {
  const { usuario, rol, cargando } = useAuth();
  const router = useRouter();

  // La logica de la proteccion
  useEffect(() => {
    if (cargando) return; // Esperar a que Firebase confirme el estado de sesión

    if (!usuario) {
      router.push("/login");
      return;
    }

    if (soloAdmin && rol !== "admin") {
      router.push("/"); // Usuario logueado pero sin permisos → manda al dashboard
    }
  }, [usuario, rol, cargando, soloAdmin, router]);

  // Mientras verifica, no muestra nada (evita el "flash" de contenido), es un render
  if (cargando || !usuario) return null;
  if (soloAdmin && rol !== "admin") return null;

  return <>{children}</>;
}