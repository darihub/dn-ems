// app/page.tsx
{/*import { db } from "@/lib/firebase";
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
Codigo que usamos para testear se puede borrar.
*/}


// 
"use client";

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleados";
import { Empleado, Departamento } from "@/types/empleado";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type EstadisticasDepto = {
  departamento: string;
  total: number;
};

export default function Dashboard() {
  const { usuario, cargando: cargandoAuth } = useAuth();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario) return;
    getEmpleados().then((data) => {
      setEmpleados(data);
      setCargando(false);
    });
  }, [usuario]);

  if (cargandoAuth || cargando) {
    return <div className="p-8 text-gray-500">Cargando...</div>;
  }

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">HR System</h1>
          <p className="text-gray-500 mb-4">Sistema de gestión de empleados</p>
          <Link href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  // Calcular estadísticas a partir del array en memoria
  const activos = empleados.filter((e) => e.activo).length;
  const inactivos = empleados.length - activos;

  const porDepto: EstadisticasDepto[] = Object.entries(
    empleados.reduce((acc, emp) => {
      acc[emp.departamento] = (acc[emp.departamento] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([departamento, total]) => ({ departamento, total }))
    .sort((a, b) => b.total - a.total);

  const recientes = [...empleados]
    .sort((a, b) => b.fechaIngreso.localeCompare(a.fechaIngreso))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total empleados", valor: empleados.length, color: "text-blue-600" },
          { label: "Activos", valor: activos, color: "text-green-600" },
          { label: "Inactivos", valor: inactivos, color: "text-red-500" },
        ].map((card) => (
          <div key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-4xl font-bold mt-1 ${card.color}`}>{card.valor}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Empleados por departamento */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Por departamento</h2>
          <div className="space-y-3">
            {porDepto.map(({ departamento, total }) => (
              <div key={departamento}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{departamento}</span>
                  <span className="font-medium text-gray-900">{total}</span>
                </div>
                {/* Barra proporcional al total */}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(total / empleados.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingresos recientes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Ingresos recientes</h2>
          <div className="space-y-3">
            {recientes.map((emp) => (
              <div key={emp.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{emp.nombre}</p>
                  <p className="text-xs text-gray-500">{emp.cargo} · {emp.departamento}</p>
                </div>
                <p className="text-xs text-gray-400">{emp.fechaIngreso}</p>
              </div>
            ))}
          </div>
          <Link href="/empleados"
            className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-4">
            Ver todos →
          </Link>
        </div>
      </div>
    </div>
  );
}