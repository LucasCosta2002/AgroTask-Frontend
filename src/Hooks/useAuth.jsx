import { useContext } from "react";
import AuthContext from "../Context/AuthProvider.jsx"; //traer el contexto del proveedor

function useAuth() {
  return useContext(AuthContext)
}

export default useAuth

//archivo que se va a importar en cada componente que lo necesite, en lugar de importar todo el provider