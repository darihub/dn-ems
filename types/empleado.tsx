export type Departamento =
  | "Tecnologia"
  | "Recursos Humanos"
  | "Administración"
  | "Ventas"
  | "Marketing"
  | "Operaciones";

  export type Empleado = {
    id: string; // Lo asigna Firebase automáticamente
    nombre: string;
    email: string;
    cargo: string;
    departamento: string;
    fechaIngreso: string; // Formato "YYYY-MM-DD"
    salario: number;
    activo: boolean;
    telefono?: string;    // El ? significa que es opcional
    foto?: string;        // URL de imagen, opcional
  };

// Este tipo se usa al crear un empleado nuevo:
// todavía no tiene id porque Firestore no lo generó
export type EmpleadoNuevo = Omit<Empleado, "id">;