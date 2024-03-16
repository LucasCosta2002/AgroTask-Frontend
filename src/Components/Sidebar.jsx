import { Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import useWorks from '../Hooks/useWorks';
const Sidebar = () => {

    const {auth} = useAuth();
    const {changeModalWork} = useWorks();

    return (
        <aside className='flex flex-col gap-5 p-4 pt-0 md:w-1/5'>
            <p className='font-bold text-xl'>Hola {auth.name}</p>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'
                to="/works">Trabajos
            </Link>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'
                to={"/works/resumen"}>Reportes
            </Link>
            <Link 
                className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base' 
                to={"/clients"}>Clientes
            </Link>
            <Link to="/works" className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base' onClick={changeModalWork}>+ Nuevo Trabajo</Link>
        </aside>
    )
}

export default Sidebar