// app/not-found.tsx

import Link from "next/link";

// Es una pagina corte error 404, si alguien entra a un URL que no existe en la app Next lo enviara a aca.
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600 mb-2">404</p>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Página no encontrada
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          La página que buscás no existe o fue movida.
        </p>
        <Link href="/"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg 
                     hover:bg-blue-700 transition-colors text-sm font-medium">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}