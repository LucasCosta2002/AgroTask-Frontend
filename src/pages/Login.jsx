import { Link, useNavigate } from "react-router-dom"
import Alerta from "../Components/Alerta.jsx"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../Hooks/useAuth.jsx"


const Login = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [alerta, setAlerta] = useState({})

	const {setAuth} = useAuth();

	const navigate = useNavigate()

	const handleSubmit = async e =>{
		e.preventDefault()

		if ([email, password].includes("")) {
			setAlerta({
				msg: "Todos los campos son obligatorios",
				error: true
			})
			return
		}

		try {
			const {data} = await clienteAxios.post("/usuarios/login", {email, password});
			localStorage.setItem("token", data.token)
			setAlerta({})
			setAuth(data)
			navigate("/trabajos")
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})
		}

		setTimeout(() => {
			setAlerta({})
		}, 4000);
	}

	const {msg} = alerta;

	return (
		<form 
			className="bg-white py-7 px-5 rounded-md shadow-lg "
			onSubmit={handleSubmit}	
		>
			<h3 className="text-center text-2xl font-bold text-green-600">Iniciá Sesión</h3>
			<div className="font-bold mt-5 mb-3">
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
			<div className="font-bold my-5">
				<label htmlFor="password" className="block mb-4 text-green-600">Contraseña</label>
				<input 
					type="password" 
					name="password" 
					id="password" 
					placeholder="******"
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					value={password}
					onChange={e => setPassword(e.target.value)}
					/>
			</div>
			{msg && <Alerta alerta={alerta}/>}
			<button
				type="submit"
				className="bg-green-600 p-2 w-full uppercase shadow-md rounded-md text-white font-bold hover:bg-green-700 transition-all my-5"	
			>Iniciar Sesión
			</button>
			
			<nav className="lg:flex-row lg:justify-between gap-2 flex flex-col text-green-600">
				<Link to={"registrar"} className="text-center">¿No tenés cuenta? Registrate</Link>
				<Link to={"olvide-password"} className="text-center">Olvidé mi contraseña</Link>
			</nav>
		</form>
	)
}

export default Login