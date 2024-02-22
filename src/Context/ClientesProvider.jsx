import { createContext, useEffect, useState } from "react"
import { queryBy } from "../helpers/queryBy";
import useAuth from "../Hooks/useAuth";


const ClientesContext = createContext();

// eslint-disable-next-line react/prop-types
const ClientesProvider = ({children}) => {

    const [ clientes, setClientes] = useState([])
    const [ cliente, setCliente] = useState({})

    const {auth} = useAuth()

    //si el usuario esta autenticado traemos los clientes
    useEffect(() => {

        const obtenerClientes = async () => {
            const data = await queryBy("get", "/clientes");
            setClientes(data);
        }
        obtenerClientes();
    }, [auth])


    return (
        <ClientesContext.Provider
            value={{
                clientes,
                cliente
            }}
        >
            {children}
        </ClientesContext.Provider>
    )
}

export {
    ClientesProvider
}

export default ClientesContext;