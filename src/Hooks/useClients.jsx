import { useContext } from "react";
import ClientsContext from "../Context/ClientsProvider.jsx";

function useClients() {
    return useContext(ClientsContext)
}

export default useClients
