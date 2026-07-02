"use client";

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleados";
import { Empleado, Departamento } from "@/types/empleado";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Spinner from "@/components/Spinner";

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
    return (
      <>
          <section className="relative mx-auto overflow-hidden max-w-screen min-h-screen bg-[#252C68] text-white">
            {/* Círculos decorativos */}
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full border border-white/15 bg-white/10" />
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/20" />
            <div className="absolute bottom-0 left-0 h-70 w-70 rounded-full bg-white/20" />
            <div className="absolute -bottom-20 -left-20 h-100 w-100 rounded-full border border-white/15 bg-white/10" />
            
            <div className="mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-8 py-16">
              {/* Logo */}
              <span className="mb-8 text-4xl font-bold tracking-tight pt-25">
                DNFlow
              </span>

              {/* Título */}
              <h1 className="max-w-3xl font-serif text-6xl font-bold leading-tight">
                Gestión de personal,
                <br />
                simple y en la nube.
              </h1>

              {/* Descripción */}
              <p className="mt-8 max-w-2xl text-xl text-gray-200">
                Una solución moderna para que tu empresa deje de gestionar empleados
                en planillas de Excel.
              </p>

              {/* Footer */}
              <p className="absolute bottom-0 right-0 mt-12 text-sm text-gray-300 px-100 py-30">
                Dario · Nicolás — Seahub
              </p>
            </div>
          </section>
      </>
    );
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
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

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