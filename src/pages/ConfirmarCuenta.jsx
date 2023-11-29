import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../Components/Alerta.jsx"
import clienteAxios from "../config/clienteAxios.jsx"

const ConfirmarCuenta = () => {

    const params = useParams()
    const {id} = params;

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    
    useEffect(() => {
        //leer de la url y enviar token al backend para que lo confirme
        const confirmarCuenta = async ()=>{
            try {
                const {data} = await clienteAxios.get(`/usuarios/confirmar/${id}`)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        return () =>{ confirmarCuenta()}
    }, [])
    
    const {msg} = alerta;

    return (
        <div className="bg-white py-7 px-5 rounded-md shadow-lg flex flex-col items-center">
            <h3 className="text-center text-2xl font-bold text-green-600 mb-5">Confirmá tu Cuenta</h3>

            <div>
                {msg && <Alerta alerta={alerta}/>}
            </div>

            {cuentaConfirmada && 
            <nav className="lg:flex-row lg:justify-between gap-2 flex flex-col text-green-600 mt-10">
				<Link to={"/"} className="text-center">Iniciá Sesión</Link>
			</nav>}
                
        </div>
    )
}

export default ConfirmarCuenta