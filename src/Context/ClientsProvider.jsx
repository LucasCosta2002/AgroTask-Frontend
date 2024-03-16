import { createContext, useEffect, useState } from "react"
import { queryBy } from "../helpers/queryBy.jsx";
import useAuth from "../Hooks/useAuth";
import clienteAxios from "../config/clienteAxios.jsx";

const ClientsContext = createContext();

// eslint-disable-next-line react/prop-types
const ClientsProvider = ({children}) => {

    const [ clients, setClients ] = useState([])
    const [ client, setClient ] = useState({})
    const [ modalClient, setModalClient ] = useState(false)
    const [ modalDelete, setModalDelete ] = useState(false)

    const [ alert, setAlert ] = useState({})

    const {auth} = useAuth();

    //si el usuario esta autenticado traemos los clientes
    useEffect(() => {
        const getClients = async () => {
            const data = await queryBy("get", "/clients");
            setClients(data);
        }
        getClients();
    }, [auth])

    const showAlert = alert =>{
        setAlert(alert)
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    const submitClient = async client =>{
        if(client?.id){
            await editClient(client);
        }else {
            await newClient(client);
        }
    }

    const newClient = async client =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/clients`, client, config)

            setClients([...clients, data])

            setAlert({
                msg: "Cliente Creado Correctamente",
                error: false
            })

            setTimeout(() => {
                setAlert({})
                setModalClient(false)
            }, 2500);
        } catch (error) {
            console.log(error)
        }
    }

    const editClient = async client =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/clients/${client.id}`, client, config)

            // sincronizar state con base de datos
            const clientsUpdate = clients.map(clientState => clientState._id === data._id ? data : clientState);
            
            setClients(clientsUpdate);

            setAlert({
                msg: "Cliente Editado Correctamente",
                error: false
            })

            setTimeout(() => {
                setAlert({})
                setModalClient(false)
            }, 2500);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteClient = async id =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/clients/${id}`, config)

            const clientUpdate = clients.filter(clientState => clientState._id !== id)

            setClients(clientUpdate);

            setTimeout(() => {
                setModalDelete(false)
                setAlert({})
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalDelete = () => {   
        setModalDelete(!modalDelete)
    }
    const handleModalEdit = client =>{
        //mandar client al state
        setClient(client)
        setModalClient(true)
    }

    const handleModalClient = () => {
        setModalClient(!modalClient)
        //limpiar el state cada vez que sea un nuevo cliente
        setClient({})
    }

    return (
        <ClientsContext.Provider
            value={{
                clients,
                client,
                modalClient,
                handleModalClient,
                alert,
                showAlert,
                submitClient,
                handleModalDelete,
                modalDelete,
                deleteClient,
                handleModalEdit
            }}
        >
            {children}
        </ClientsContext.Provider>
    )
}

export {
    ClientsProvider
}

export default ClientsContext;