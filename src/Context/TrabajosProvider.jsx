import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TrabajosContext = createContext()

const TrabajosProvider = ({children}) => {

    const [alerta, setAlerta] = useState({})
    const [trabajos, setTrabajos] = useState([])
    const [trabajo, setTrabajo]  = useState({})
    const [modalNuevoTrabajo, setModalNuevoTrabajo] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [modalEliminarTrabajo, setModalEliminarTrabajo] = useState(false)

    const {auth} = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        const obtenerProyectos = async ()=>{
            try {
                const token = localStorage.getItem("token");
                if(!token) return

                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios("/trabajos", config)
                setTrabajos(data);
            } catch (error) {
                console.log(error)
            }
        }
        return () => {obtenerProyectos()}
    }, [auth]) //si el usuario esta autenticado le traemos los proyectos
    
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3500);
    }

    const submitTrabajo = async trabajo =>{
        console.log(trabajo);
        if(trabajo.id){
            await editarTrabajo(trabajo)
        }else{
            await nuevoTrabajo(trabajo)
        }
    }

    const nuevoTrabajo = async trabajo =>{
        console.log("nuevo"); 
        try {
            // obtener token del usuario (permisos)
            const token = localStorage.getItem("token")
            if(!token) return
            // pasar token como bearer token
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // enviar peticion al backend
            const {data} = await clienteAxios.post("/trabajos", trabajo, config)
            setAlerta({msg: "Trabajo creado correctamente", error: false})

            // tomar copia de los trabajos anteriores y agregar el nuevo para evitar doble consulta en base de datos
            setTrabajos([...trabajos, data])

            setTimeout(() => {
                setAlerta({})
                setModalNuevoTrabajo(false)
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerTrabajo = async id =>{
        setCargando(true)
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/trabajos/${id}`, config)
            setTrabajo(data)

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            navigate("/trabajos")
        }
        setCargando(false)
    }

    const editarTrabajo = async trabajo =>{
        try {
            // obtener token del usuario (permisos)
            const token = localStorage.getItem("token")
            if(!token) return

            // pasar token como bearer token
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // enviar peticion al backend
            const {data} = await clienteAxios.put(`/trabajos/${trabajo.id}`, trabajo, config)
            //Sincronizar base de datos con state

            setAlerta({msg: "Trabajo Actualizado", error: false})
            setTimeout(() => {
                setAlerta({})
                navigate("/trabajos")
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTrabajo = async id =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/trabajos/${id}`, config) //eliminar de db

            // eliminar del state
            const trabajosActualizados = trabajos.filter(trabajoState => trabajoState._id !== id)

            setTrabajos(trabajosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                navigate("/trabajos")
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const changeModalTrabajo = ()=>{
        setModalNuevoTrabajo(!modalNuevoTrabajo)
    }

    const handleModalEliminarTrabajo = ()=>{
        setModalEliminarTrabajo(!modalEliminarTrabajo)
    }


    return (
        <TrabajosContext.Provider
            value={{
                changeModalTrabajo,
                modalNuevoTrabajo,
                submitTrabajo,
                trabajos,
                trabajo,
                obtenerTrabajo,
                nuevoTrabajo,
                alerta,
                mostrarAlerta,
                eliminarTrabajo,
                editarTrabajo,
                cargando,
                handleModalEliminarTrabajo,
                modalEliminarTrabajo
            }}
        >
            {children}
        </TrabajosContext.Provider>
    )
}

export { TrabajosProvider}

export default TrabajosContext //este se importa al useHook