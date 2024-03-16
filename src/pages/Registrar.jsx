import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../Components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [alerta, setAlerta] = useState({})


	const handleSubmit = async (e)=>{
		
		e.preventDefault()

		if ([name, email, phone, password, passwordRepeat].includes("")) {
			setAlerta({
				msg: "Todos los campos son obligatorios",
				error: true
			})
			return
		}
		if (password !== passwordRepeat) {
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
			const {data} = await clienteAxios.post(`/users`, {name, email, password, phone})
			setAlerta({msg: data.msg, error: false})

			setName("")
			setEmail("")
			setPassword("")
			setPhone("")
			setPasswordRepeat("")

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
				<label htmlFor="name" className="block mb-4 text-green-600">Nombre</label>
				<input 
					type="text" 
					name="name" 
					id="name" 
					placeholder="Juan Pérez"
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					value={name}
					onChange={e => setName(e.target.value)}
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
				<label htmlFor="phone" className="block mb-4 text-green-600">Telefono</label>
				<input 
					type="tel" 
					name="phone" 
					id="phone" 
					placeholder="1234 567890"
					className="bg-campos w-full p-2 rounded-lg shadow-md font-normal"
					value={phone}
					onChange={e => setPhone(e.target.value)}
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
					value={passwordRepeat}
					onChange={e => setPasswordRepeat(e.target.value)}
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