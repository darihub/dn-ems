
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UsuarioApp, Rol } from "@/types/usuario";

// Apartado de Login: 
export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
  // Si las credenciales son incorrectas, Firebase tira un error
  // que hay que atrapar con try/catch donde se llame esta función
}

// Apartado de Log-Out: 
export async function logout(): Promise<void> {
  await signOut(auth);
}

// Apartado de Obtencion de Rol del Usuario
// Firebase Auth guarda email y uid, pero NO el rol
// El rol lo guardamos nosotros en Firestore
export async function getRolUsuario(uid: string): Promise<Rol> {
  console.log("Buscando rol para UID:", uid); // ← agregar
  const docRef = doc(db, "usuarios", uid);
  const docSnap = await getDoc(docRef);

  console.log("Documento existe:", docSnap.exists()); // ← agregar
  console.log("Datos:", docSnap.data()); // ← agregar

  if (docSnap.exists()) {
    return docSnap.data().rol as Rol;
  }

  // Si el usuario no tiene documento en Firestore, le damos viewer por defecto
  return "viewer";
}

// Apartado de Creacion de Usuario en FireStore:
// Firebase Auth crea el usuario para login, pero nosotros
// guardamos los datos extra (nombre, rol) en Firestore
export async function guardarUsuarioEnFirestore(
  uid: string,
  email: string,
  nombre: string,
  rol: Rol = "viewer"
): Promise<void> {
  await setDoc(doc(db, "usuarios", uid), {
    uid,
    email,
    nombre,
    rol,
  });
}

// Observer de sesion: 
// Ejecuta el callback cada vez que el estado de login cambia
// (usuario inicia sesión, cierra sesión, o recarga la página)
export function observarSesion(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}