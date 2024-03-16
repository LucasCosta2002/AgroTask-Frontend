import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../Components/Alerta.jsx"
import axios from "axios"
import clienteAxios from "../config/clienteAxios.jsx"

const NuevoPassword = () => {

    const params = useParams()
    const {token} = params

    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordModificado, setPasswordModificado] = useState(false)

    useEffect(() => {
        // comprobarToken al cargar la pagina
        const comprobarToken = async ()=>{
            try {
                await clienteAxios.get( `/users/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        return () =>{ comprobarToken()}
    }, [])
    

    const handleSubmit = async e =>{
        e.preventDefault()
        if(password === "" && password.length < 6){
            setAlerta({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true,
            })
            return
        }
        try {
            //a la url con el token le pasamos el password leido al backend que lo hashea y guarda
            const url = `/users/olvide-password/${token}`
            const {data} = await clienteAxios.post(url, {password})
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta;

    return (
        <form 
            className="bg-white py-7 px-5 rounded-md shadow-lg"
            onSubmit={handleSubmit}
            >
            <h3 className="text-center text-2xl font-bold text-green-600 mb-4">Recuperá tu cuenta</h3>
            {msg && <Alerta alerta={alerta} />}

            {tokenValido && <>
                <div className="font-bold my-5">
                    <label htmlFor="password" className="block mb-4 text-green-600">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
                        placeholder='nueva contraseña'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 p-2 w-full uppercase shadow-md rounded-md text-white font-bold hover:bg-green-600Dark transition-all  mt-4"	
                >Guardar
                </button>
            </>
            }

            {passwordModificado && 
                <nav className="lg:flex-row lg:justify-center gap-2 flex flex-col text-green-600 mt-10">
                    <Link to={"/"} className="text-center">Iniciá Sesión</Link>
                </nav>
            }
        </form>

    )
}

export default NuevoPassword