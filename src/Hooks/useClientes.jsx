import { useContext } from "react";
import ClientesContext from "../Context/ClientesProvider";

function useClientes() {
    return useContext(ClientesContext)
}

export default useClientes
