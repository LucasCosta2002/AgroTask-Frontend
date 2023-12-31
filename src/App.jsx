import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { TrabajosProvider } from './Context/TrabajosProvider'

import RutaProtegida from './layouts/RutaProtegida.jsx'
import Trabajos from './pages/Trabajos.jsx'
import Clientes from './pages/Clientes.jsx'
import Resumen from './pages/Resumen.jsx'
import Trabajo from './pages/Trabajo.jsx'
import EditarTrabajo from './pages/EditarTrabajo'


function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<TrabajosProvider>
					<Routes>
						{/* rutas publicas*/}
						<Route path='/' element={<AuthLayout/>}>
							{/* todos los archivos se inyectan como outlet de Authlayout */}
							<Route index element={<Login/>}/>
							<Route path="registrar" element={<Registrar/>}/>
							<Route path="olvide-password" element={<OlvidePassword/>}/>
							<Route path="olvide-password/:token" element={<NuevoPassword/>}/>
							<Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
						</Route>	

					{/* rutas privadas */}
						<Route path='/trabajos' element={<RutaProtegida/>}>
							{/* todos los archivos se inyectan como outlet de RutaProtegida */}
							<Route index element={<Trabajos/>}/>
							<Route path='resumen' element={<Resumen/>}/>
							<Route path='clientes' element={<Clientes/>}/>
							<Route path=':id' element={<Trabajo/>}/>
							<Route path='editar/:id' element={<EditarTrabajo/>}/>
						</Route>
					</Routes>
				</TrabajosProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
