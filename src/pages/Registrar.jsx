import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../Components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

	const [nombre, setNombre] = useState("")
	const [email, setEmail] = useState("")
	const [telefono, setTelefono] = useState("")
	const [password, setPassword] = useState("")
	const [repetirPassword, setRepetirPassword] = useState("")
	const [alerta, setAlerta] = useState({})


	const handleSubmit = async (e)=>{
		
		e.preventDefault()

		if ([nombre, email, telefono, password, repetirPassword].includes("")) {
			setAlerta({
				msg: "Todos los campos son obligatorios",
				error: true
			})
			return
		}
		if (password !== repetirPassword) {
			setAlerta({
				msg: "Las Contraseñas no coinciden",
				error: true
			})
			return
		}
		if (password.length < 6) {
			setAlerta({
				msg: "La Contraseña Debe tener al menos 6 caracteres",
				error: true
			})
			return
		}

		//Despues de las validaciones, crear el objeto usuario y pasarlo a la api
		try {
			const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password, telefono})
			setAlerta({msg: data.msg, error: false})

			setNombre("")
			setEmail("")
			setPassword("")
			setTelefono("")
			setRepetirPassword("")

		} catch (error) {
			setAlerta({msg: error.response.data.msg, error: true});
		}

		setTimeout(() => {
			setAlerta({})
		}, 5000);
	}

	const {msg} = alerta;

    return (

        <form 
			className="bg-white py-7 px-5 rounded-md shadow-lg capitalize"
			onSubmit={handleSubmit}	
		>
			<h3 className="text-center text-2xl font-bold text-green-600">Creá tu cuenta</h3>

			<div className="font-bold mt-5 mb-3">
				<label htmlFor="nombre" className="block mb-4 text-green-600">Nombre</label>
				<input 
					type="text" 
					name="nombre" 
					id="nombre" 
					placeholder="Juan Pérez"
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					value={nombre}
					onChange={e => setNombre(e.target.value)}
					/>
			</div>
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
			<div className="font-bold mt-5 mb-3">
				<label htmlFor="telefono" className="block mb-4 text-green-600">Telefono</label>
				<input 
					type="tel" 
					name="telefono" 
					id="telefono" 
					placeholder="1234 567890"
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					value={telefono}
					onChange={e => setTelefono(e.target.value)}
					/>
			</div>
			<div className="font-bold my-5">
				<label htmlFor="password" className="block mb-4 text-green-600">Contraseña</label>
				<input 
					type="password" 
					name="password" 
					id="password" 
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					placeholder="******"
					value={password}
					onChange={e => setPassword(e.target.value)}
					/>
			</div>
			<div className="font-bold my-5">
				<label htmlFor="password2" className="block mb-4 text-green-600">Repetir Contraseña</label>
				<input 
					type="password" 
					name="password2" 
					id="password2" 
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					placeholder="******"
					value={repetirPassword}
					onChange={e => setRepetirPassword(e.target.value)}
					/>
			</div>
            {msg && <Alerta alerta={alerta}/>}
			
			<button
				type="submit"
				className="bg-green-600 p-2 w-full uppercase shadow-md rounded-md text-white font-bold hover:bg-green-700 transition-all mt-3 mb-5"	
			>Crear Cuenta
			</button>
			
			<nav className="lg:flex-row lg:justify-between gap-2 flex flex-col text-green-600">
				<Link to={"/"} className="text-center">¿Ya tenés cuenta? Iniciá Sesión</Link>
				<Link to={"/olvide-password"} className="text-center">Olvidé mi contraseña</Link>
			</nav>
		</form>
    )
}

export default Registrar