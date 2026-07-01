// lib/usuarios.ts
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UsuarioApp, Rol } from "@/types/usuario";

export async function getUsuarios(): Promise<UsuarioApp[]> {
  const snap = await getDocs(collection(db, "Usuarios"));
  return snap.docs.map(d => ({ ...d.data() } as UsuarioApp));
}

export async function cambiarRol(uid: string, nuevoRol: Rol): Promise<void> {
  await updateDoc(doc(db, "Usuarios", uid), { rol: nuevoRol });
}