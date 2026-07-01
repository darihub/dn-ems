// app/usuarios/page.tsx — tabla simple con dropdown de rol por fila
"use client";
import { useEffect, useState } from "react";
import { getUsuarios, cambiarRol } from "@/lib/usuarios";
import { UsuarioApp, Rol } from "@/types/usuario";
import RutaProtegida from "@/components/RutaProtegida";

export default function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioApp[]>([]);

  useEffect(() => { getUsuarios().then(setUsuarios); }, []);

  async function handleRolChange(uid: string, nuevoRol: Rol) {
    await cambiarRol(uid, nuevoRol);
    setUsuarios(prev => prev.map(u => u.uid === uid ? { ...u, rol: nuevoRol } : u));
  }

  return (
    <RutaProtegida soloAdmin={true}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestión de usuarios</h1>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Nombre", "Email", "Rol"].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map(u => (
                <tr key={u.uid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{u.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <select value={u.rol}
                      onChange={(e) => handleRolChange(u.uid, e.target.value as Rol)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm
                                 bg-white text-gray-900 [&>option]:bg-white [&>option]:text-gray-900
                                 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="viewer">viewer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RutaProtegida>
  );
}