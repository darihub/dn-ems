"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/auth";

export default function Navbar(){
    const {usuario, rol, cargando} = useAuth();
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.push("/login");
    }

    if(cargando) return null;

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="max-w-7x1 mx-auto flex justify-between items-center">
                {/* Logo / Nombre del sistema */}
                <Link href="/" className="text-lg font-bold text-blue-600">
                    HR System
                </Link>

                {usuario ? (
                    <div className="flex items-center gap-6">
                     <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/empleados" className="text-sm text-gray-600 hover:text-gray-900">
              Empleados
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{usuario.email}</span>
              {/* Badge de rol */}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                              ${rol === "admin" 
                                ? "bg-blue-100 text-blue-700" 
                                : "bg-gray-100 text-gray-600"}`}>
                {rol}
              </span>
              <button onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800">
                Salir
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
