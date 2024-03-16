import useWorks from '../Hooks/useWorks';
import ModalCerrarSesion from "./ModalCerrarSesion";

const Header = () => {

    // const { handleModalCerrarSesion } = useWorks();

    return (
        <header className='p-4 pb-2'>
            <div className='md:flex-row flex flex-col gap-4 md:justify-between md:items-center text-center'>
                <h1 className='text-5xl text-green-600 font-bold uppercase mb-3 md:mb-0'>AgroTask</h1>
                {/* <button onClick={handleModalCerrarSesion} className='bg-red-600 p-2 mt-3 md:mt-0 text-white rounded-md font-bold transition-colors shadow-md hover:bg-red-700'>Cerrar Sesion</button>
                <ModalCerrarSesion /> */}
            </div>
        </header>
    )
}

export default Header