import {useParams, Link} from 'react-router-dom'
import useTrabajos from '../Hooks/useTrabajos'
import { useEffect } from 'react'
import ModalConfirmar from '../Components/ModalConfirmar'
import { formatearFecha } from '../helpers/formatearFecha'

const Trabajo = () => {

    const params = useParams()
    
    const {obtenerTrabajo, trabajo, cargando, handleModalEliminarTrabajo} = useTrabajos()

    useEffect(() => {
        obtenerTrabajo(params.id)
    }, [])
    
    const { cliente, agroquimico, ubicacion, hectareas, fecha } = trabajo

    return (
        <>
            {cargando ? 
                <div className="border border-gray-300 shadow rounded-md p-4 max-w-4xl w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-400 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-400 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-400 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div> 
            :
                <div className='flex justify-center'>
                    <div className='bg-white shadow-md rounded-lg p-4 w-full md:w-1/3'>
                        <div className='flex gap-3 justify-end -mb-7'>
                            <Link to={`/trabajos/editar/${params.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400  hover:text-gray-500 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </Link>
                            <button onClick={handleModalEliminarTrabajo}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 hover:text-red-700 transition-all font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        
                        <ModalConfirmar trabajo={trabajo}/>
                        <h2 className="bg-mi-verde rounded-md text-white inline-block p-2 text-xl font-semibold">{cliente}</h2>
                        <p className="mb-1 mt-3 text-green-800">Ubicación: {ubicacion}</p>
                        <p className="mb-1 text-green-800">Hectáreas: {hectareas}</p>
                        <p className="mb-1 text-green-800">Agroquímico: {agroquimico}</p>
                        <p className="text-green-800">Fecha: {formatearFecha(fecha)}</p>
                        
                        <button className='mt-4 bg-green-600 p-2 text-white rounded-md font-bold flex justify-between hover:bg-green-700 transition-all'>Descargar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </button>
                    </div>
                </div>

            }
        </>
    )
}

export default Trabajo
