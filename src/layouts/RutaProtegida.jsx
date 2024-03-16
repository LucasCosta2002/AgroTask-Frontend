import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../Hooks/useAuth.jsx"
import Header from "../Components/Header.jsx"
import Sidebar from "../Components/Sidebar.jsx"
import ModalWork from "../Components/ModalWork.jsx"
import ModalClient from "../Components/ModalClient.jsx"

const RutaProtegida = () => {

    const {auth, loading} = useAuth();
    
    if(loading){
        return ( 
            <div className="mx-auto flex justify-center h-screen items-center">
                <div className="custom-loader"></div>
            </div>
        )
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
                            <ModalWork/>
                            <ModalClient/>
                        </main>
                    </div>
                </>
            ) : <Navigate to="/"/>}
        </>
    )
}

export default RutaProtegida