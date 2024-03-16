import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { WorksProvider } from './Context/WorksProvider'
import { ClientsProvider } from './Context/ClientsProvider.jsx'

import RutaProtegida from './layouts/RutaProtegida.jsx'
import Trabajos from './pages/Trabajos.jsx'
import Clients from './pages/Clients.jsx'
import Resumen from './pages/Resumen.jsx'
// import Trabajo from './pages/Trabajo.jsx'

// eslint-disable-next-line react/prop-types

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<WorksProvider>
					<ClientsProvider>
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
							<Route path='/works' element={<RutaProtegida/>}>
								{/* todos los archivos se inyectan como outlet de RutaProtegida */}
								<Route index element={<Trabajos/>}/>
								<Route path='resumen' element={<Resumen/>}/>
								{/* <Route path='editar/:id' element={<EditarTrabajo/>}/> */}
							</Route>
							
							<Route path='/clients' element={<RutaProtegida/>}>
								<Route index element={<Clients/>}/>
							</Route>
						</Routes>
					</ClientsProvider>
				</WorksProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
