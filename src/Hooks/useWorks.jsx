import { useContext } from "react";
import WorksContext from "../Context/WorksProvider";


function useWorks() {
  return useContext(WorksContext)
}

export default useWorks

//archivo que se va a importar en cada componente que lo necesite, en lugar de importar todo el provider