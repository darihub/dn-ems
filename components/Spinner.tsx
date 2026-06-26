// components/Spinner.tsx

// Esto por defecto mostrara Cargando, aunque como se puede reutilizar podemos cambiarlo en los otros files
export default function Spinner({ texto = "Cargando..." }: { texto?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 
                      rounded-full animate-spin" />
      <p className="text-sm text-gray-500">{texto}</p>
    </div>
  );
}