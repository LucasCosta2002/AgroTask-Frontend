import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../Hooks/useAuth";
import { queryBy } from "../helpers/queryBy.jsx";

const TrabajosContext = createContext()

const TrabajosProvider = ({children}) => {

    const [alerta, setAlerta] = useState({})
    const [trabajos, setTrabajos] = useState([])
    const [trabajo, setTrabajo]  = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalNuevoTrabajo, setModalNuevoTrabajo] = useState(false)
    const [modalEliminarTrabajo, setModalEliminarTrabajo] = useState(false)
    // const [modalEditarTrabajo, setModalEditarTrabajo] = useState({})

    const {auth} = useAuth()
    const navigate = useNavigate()
    
    //si el usuario esta autenticado le traemos los trabajos
    useEffect(() => {
        const obtenerTrabajos = async ()=>{
            try {
                const data = await queryBy("get", "/trabajos");
                setTrabajos([data]);
            } catch (error) {
                console.log(error)
            }
        }
        return () => {obtenerTrabajos()}
    }, [auth, trabajos])
    
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3500);
    }

    const submitTrabajo = async trabajo =>{
        if(trabajo.id){
            await editarTrabajo(trabajo)
        }else{
            await nuevoTrabajo(trabajo)
        }
    }

    const nuevoTrabajo = async trabajo =>{
        try {
            const data = await queryBy("post", "/trabajos", trabajo)
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
            const data = await queryBy("get",`/trabajos/${id}`)
            setTrabajo(data.trabajo)
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

    // const eliminarTrabajo = async id =>{
    //     try {
    //         const token = localStorage.getItem("token")
    //         if(!token) return

    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //         //eliminar de db
    //         const {data} = await clienteAxios.delete(`/trabajos/${id}`, config)

    //         // eliminar del state
    //         const trabajosActualizados = trabajos.filter(trabajoState => trabajoState._id !== id)

    //         setTrabajos(trabajosActualizados)

    //         setAlerta({
    //             msg: data.msg,
    //             error: false
    //         })

    //         setTimeout(() => {
    //             navigate("/trabajos")
    //             setAlerta({})
    //         }, 3000);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const changeModalTrabajo = ()=>{
        setModalNuevoTrabajo(!modalNuevoTrabajo)
    }

    const handleModalEditarTrabajo = ()=>{
        // setModalEditarTrabajo(!modalEditarTrabajo)
        
    }

    const handleModalEliminarTrabajo = trabajo =>{
        // setModalEliminarTrabajo(!modalEliminarTrabajo)
        setTrabajo(trabajo)
        console.log(trabajo)
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
                // eliminarTrabajo,
                editarTrabajo,
                cargando,
                handleModalEliminarTrabajo,
                modalEliminarTrabajo,
                handleModalEditarTrabajo
            }}
        >
            {children}
        </TrabajosContext.Provider>
    )
}

export { TrabajosProvider}

export default TrabajosContext //este se importa al useHook