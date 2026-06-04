export type Rol = "admin" | "viewer";

export type UsuarioApp = {
  uid: string;      // Esto es el ID que asigna Firebase Auth
  email: string;
  rol: Rol;          //  Esto se guarda en la Firestore, no en la firebase
  nombre: string;
};