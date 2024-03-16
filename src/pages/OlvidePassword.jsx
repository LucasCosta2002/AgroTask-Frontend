import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../Components/Alerta.jsx"
import clienteAxios from "../config/clienteAxios.jsx"


const OlvidePassword = () => {

    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e =>{
        e.preventDefault()
        if(email === "" && email.test( /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)){
            setAlerta({
                msg: "El Email es obligatorio",
                error: true,
            })
            return
        }

        try {
            const {data} = await clienteAxios.post(`/users/olvide-password`, {email})
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const {msg} = alerta;

    return (
        <form 
            className="bg-white py-7 px-5 rounded-md shadow-lg"
            onSubmit={handleSubmit}    
        >
            <h3 className="text-center text-2xl font-bold text-green-600">Recuperá tu cuenta</h3>
            <div className="font-bold mt-5 mb-4">
                <label htmlFor="email" className="block mb-4 text-green-600">Correo Electronico</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="correo@correo.com"
                    className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
        
            {msg && <Alerta alerta={alerta} />}

            <button
                type="submit"
                className="bg-green-600 p-2 w-full uppercase shadow-md rounded-md text-white font-bold hover:bg-green-700 transition-all mt-3 mb-5"	
            >Enviar
            </button>
            
            <nav className="lg:flex-row lg:justify-between gap-2 flex flex-col text-green-600">
                <Link to={"/"} className="text-center">Ya tenés cuenta? Iniciá Sesión</Link>
                <Link to={"/registrar"} className="text-center">¿No tenés cuenta? Registrate</Link>
            </nav>
        </form>
    )
}

export default OlvidePassword