import { Link } from "react-router-dom"
import useTrabajos from "../Hooks/useTrabajos";

const Buttons = ({trabajo}) => {

    const { _id } = trabajo;
    const {handleModalEditarTrabajo} = useTrabajos();

    return (
        <div className="flex gap-1">
            <div className="group relative flex flex-col items-center justify-center">
                <Link onClick={() => handleModalEditarTrabajo(trabajo)} to={`${_id}`} className="bg-gray-300 p-2 rounded-md text-gray-500 hover:bg-gray-400 hover:text-white transition-all" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </Link>
                <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <div className="flex max-w-xs flex-col items-center">
                        <div className="rounded bg-gray-500 p-2 text-xs text-center shadow-lg">Ver</div>
                        <div className="clip-bottom h-2 w-4 bg-gray-500"></div>
                    </div>
                </div>
            </div>

            <div className="group relative flex flex-col items-center justify-center">
                <Link to={`${_id}`} className="bg-indigo-500 p-2 rounded-md text-white  hover:bg-indigo-600 transition-all" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </Link>
                <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <div className="flex max-w-xs flex-col items-center">
                        <div className="rounded bg-indigo-500 p-2 text-xs text-center shadow-lg">Editar</div>
                        <div className="clip-bottom h-2 w-4 bg-indigo-500"></div>
                    </div>
                </div>
            </div>

            <div className="group relative flex flex-col items-center justify-center">
                <Link to={`${_id}`} className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition-all " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </Link>
                <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <div className="flex max-w-xs flex-col items-center">
                        <div className="rounded bg-red-500 p-2 text-xs text-center shadow-lg">Borrar</div>
                        <div className="clip-bottom h-2 w-4 bg-red-500"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buttons