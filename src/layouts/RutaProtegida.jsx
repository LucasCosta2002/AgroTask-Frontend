import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../Hooks/useAuth.jsx"
import Header from "../Components/Header.jsx"
import Sidebar from "../Components/Sidebar.jsx"
import ModalTrabajo from "../Components/ModalTrabajo.jsx"

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()
    
    if(cargando){
        return "Cargando.."
    }

    return (
        <>
            {auth._id ? (
                <>
                    <Header/>
                    <div className="md:flex">
                        <Sidebar/>
                        <main className="p-5 pt-0 flex-1 overflow-hidden">
                            <Outlet/>  
                        </main>
                    </div>
                </>
            ) : <Navigate to="/"/>}
            <ModalTrabajo/> 
        </>
    )
}

export default RutaProtegida