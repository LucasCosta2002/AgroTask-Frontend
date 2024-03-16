import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    
    const cerrarSesion = ()=>{
        setAuth({})
        localStorage.removeItem("token")
        navigate("/")
    }


    useEffect(() => {
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem("token")

            if(!token){
                setCargando(false);
                return
            }    

            //pasar el token de permiso como bearer token que espera el backend checkauth
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }    
            }    

            try {
                // traer el perfil desde base de datos
                const {data} = await clienteAxios("/users/perfil", config)
                
                setAuth(data)

                navigate("/works")
            } catch (error) {
                setAuth({});
            }    

            setCargando(false)
        }    
        autenticarUsuario()
    }, [])    
    
    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider}

export default AuthContext //este se importa al useHook