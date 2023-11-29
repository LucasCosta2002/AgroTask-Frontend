import { Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ModalTrabajo from './ModalTrabajo';
import useTrabajos from '../Hooks/useTrabajos';
const Sidebar = () => {

    const {auth} = useAuth();
    const {changeModalTrabajo} = useTrabajos()

    return (
        <aside className='flex flex-col gap-5 p-4 pt-0 md:w-1/5'>
            <p className='font-bold text-xl'>Hola {auth.nombre}</p>
            <ModalTrabajo/> 
            <button className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base' onClick={changeModalTrabajo}>+ Nuevo Trabajo</button>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'
                to="/trabajos">Mis Trabajos
            </Link>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'
                to={"/trabajos/resumen"}>Resumen
            </Link>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base' 
                to={"/trabajos/clientes"}>Mis Clientes
            </Link>
        </aside>
    )
}

export default Sidebar