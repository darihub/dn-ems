"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { getRolUsuario, observarSesion } from "@/lib/auth";
import { Rol } from "@/types/usuario";

type AuthContextType = {
    usuario: User | null;
    rol: Rol | null;
    cargando: boolean;
};

const AuthContext = createContext<AuthContextType>({
    usuario: null,
    rol: null,
    cargando: true,
});

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [usuario, setUsuario ] = useState<User | null>(null);
    const [rol, setRol] = useState<Rol | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {  //ObservarSesion llama este callback cada vez que cambia el estado de login
        const cancelar = observarSesion(async(user) => {
            setUsuario(user);
            if(user){
                const rolObtenido = await getRolUsuario(user.uid);
                setRol(rolObtenido);
            } else{
                setRol(null);
            }
            setCargando(false);
        });

        return () => cancelar();
    }, []);  // Este [] es porque se ejecuta solo una vez cuando el componte se monta

    return (
        <AuthContext.Provider value={{usuario, rol, cargando}}>
            {children}
        </AuthContext.Provider>
    );
}
