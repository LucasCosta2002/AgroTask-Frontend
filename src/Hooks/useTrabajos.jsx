import { useContext } from "react";
import TrabajosContext from "../Context/TrabajosProvider";


function useTrabajos() {
  return useContext(TrabajosContext)
}

export default useTrabajos

//archivo que se va a importar en cada componente que lo necesite, en lugar de importar todo el provider