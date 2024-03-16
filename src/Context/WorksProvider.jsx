import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import { queryBy } from "../helpers/queryBy.jsx";

const WorksContext = createContext()

// eslint-disable-next-line react/prop-types
const WorksProvider = ({children}) => {

    const [alerta, setAlerta] = useState({})
    const [works, setWorks] = useState([])
    const [work, setWork]  = useState({})
    const [loading, setLoading] = useState(false)
    const [modalWork, setModalWork] = useState(false)
    const [modalEliminarTrabajo, setModalEliminarTrabajo] = useState(false)

    const {auth} = useAuth();
    const navigate = useNavigate();
    
    //si el usuario esta autenticado le traemos los trabajos
    useEffect(() => {
        const getWorks = async ()=>{
            setLoading(true)
            try {
                const token = localStorage.getItem("token")
                if(!token) return
    
                // pasar token como bearer token
                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios(`/works`, config)

                setWorks(data);

            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }
        getWorks();
    }, [auth])
    
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitWork = async work => {
        if(work?.id){
            await editWork(work)
        }else{
            await newWork(work)
        } 
    }

    const newWork = async work =>{
        try {
            const token = localStorage.getItem("token");

            if(!token) return;

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/works", work, config)
            
            // tomar copia de los trabajos anteriores y agregar el nuevo para evitar doble consulta en base de datos
            setWorks([...works, data])

            setAlerta({msg: "Trabajo creado correctamente", error: false})
            
            setTimeout(() => {
                setAlerta({})
                setModalWork(false)
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

    const getWork = async id =>{
        setLoading(true)
        try {
            const data = await queryBy("get",`/works/${id}`)
            setWork(data.work)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            navigate("/works")
        }
        setLoading(false)
    }

    const editWork = async work =>{
        try {
            const token = localStorage.getItem("token")

            if (!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/works/${work.id}`, work, config)
            
            const worksUpdate = works.map(workState => workState._id === data._id ? data : workState)

            setWorks(worksUpdate);

            setAlerta({
                msg: "Trabajo Actualizado", 
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                setModalWork(false)                
            }, 2500);
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
            //eliminar de db
            const {data} = await clienteAxios.delete(`/works/${id}`, config)

            // eliminar del state
            const updateWorks = works.filter(workState => workState._id !== id)

            setWorks(updateWorks)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                navigate("/works")
                setModalEliminarTrabajo(false)
                setAlerta({})

            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const changeModalWork = () =>{
        setWork({});
        navigate("/works");
        setModalWork(!modalWork);
    }

    const handleModalEditWork = work =>{
        setWork(work)
        setModalWork(true)
    }

    const handleModalEliminarTrabajo = work =>{
        setModalEliminarTrabajo(!modalEliminarTrabajo)
        setWork(work)
    }

    return (
        <WorksContext.Provider
            value={{
                changeModalWork,
                modalWork,
                submitWork,
                works,
                work,
                getWork,
                newWork,
                alerta,
                mostrarAlerta,
                eliminarTrabajo,
                editWork,
                loading,
                handleModalEliminarTrabajo,
                modalEliminarTrabajo,
                handleModalEditWork,
            }}
        >
            {children}
        </WorksContext.Provider>
    )
}

export { WorksProvider}

export default WorksContext //este se importa al useHook