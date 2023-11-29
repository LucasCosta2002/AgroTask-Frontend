import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useTrabajos from '../Hooks/useTrabajos'
import Alerta from './Alerta'

export default function ModalTrabajo() {

    const {modalNuevoTrabajo, changeModalTrabajo, alerta, mostrarAlerta, submitTrabajo, trabajo} = useTrabajos()
    
    const [cliente, setCliente] = useState("")
    const [ubicacion, setUbicacion] = useState("")
    const [hectareas, setHectareas] = useState("")
    const [agroquimico, setAgroquimico] = useState("")
    const [fecha, setFecha] = useState("")

    // nuevo: se crea una funcion que toma un state y le asignamos el evento
    const handleChange = setState => e =>{
        setState(e.target.value)
    }
    
    const handleSubmit = async e =>{
        e.preventDefault()

        if ([cliente, ubicacion, hectareas, agroquimico, fecha].includes("")) {
            mostrarAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }
        await submitTrabajo({cliente, ubicacion, hectareas, agroquimico, fecha})

        setCliente("")
        setUbicacion("")
        setHectareas("")
        setAgroquimico("")
        setFecha("")
    }

    const {msg} = alerta;

    return (
        <>
            <Transition appear show={modalNuevoTrabajo} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={changeModalTrabajo}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                                    <form onSubmit={handleSubmit}>
                                        <div className={trabajo.id ? "flex justify-end" : "hidden"}>
                                            <button className='bg-red-600 hover:bg-red-700 text-white rounded-md transition-all p-2 font-bold'>Eliminar</button>
                                        </div>
                                        <div className='mb-4 '>
                                            <label 
                                                htmlFor="cliente"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Cliente
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                </svg>
                                            </label>
                                            <input 
                                                type="text"
                                                id='cliente'
                                                name='cliente'
                                                placeholder='nombre del cliente'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={cliente}
                                                onChange={handleChange(setCliente)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="ubicacion"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Ubicación
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                            </label>
                                            <input 
                                                type="text"
                                                id='ubicacion'
                                                name='ubicacion'
                                                placeholder='nombre de la ubicacion'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={ubicacion}
                                                onChange={handleChange(setUbicacion)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="hectareas"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Hectareas
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.944a.75.75 0 01-1.5 0V7.5a.75.75 0 01.372-.648l2.25-1.312a.75.75 0 011.026.27zm12.204 0a.75.75 0 011.026-.27l2.25 1.312a.75.75 0 01.372.648v2.25a.75.75 0 01-1.5 0v-.944l-1.122.654a.75.75 0 11-.756-1.295l1.14-.665-1.14-.665a.75.75 0 01-.27-1.025zm-9 5.25a.75.75 0 011.026-.27L12 11.882l1.872-1.092a.75.75 0 11.756 1.295l-1.878 1.096V15a.75.75 0 01-1.5 0v-1.82l-1.878-1.095a.75.75 0 01-.27-1.025zM3 13.5a.75.75 0 01.75.75v1.82l1.878 1.095a.75.75 0 11-.756 1.295l-2.25-1.312a.75.75 0 01-.372-.648v-2.25A.75.75 0 013 13.5zm18 0a.75.75 0 01.75.75v2.25a.75.75 0 01-.372.648l-2.25 1.312a.75.75 0 11-.756-1.295l1.878-1.096V14.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.944l1.122-.654a.75.75 0 11.756 1.295l-2.25 1.313a.75.75 0 01-.756 0l-2.25-1.313a.75.75 0 11.756-1.295l1.122.654V19.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                                </svg>
                                            </label>
                                            <input 
                                                type="number"
                                                id='hectareas'
                                                name='hectareas'
                                                placeholder='numero de hectareas'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={hectareas}
                                                onChange={handleChange(setHectareas)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="agroquimico"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/4'
                                            >Agroquimico
                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clipRule="evenodd" />
                                                </svg>
                                            </label>
                                            <input 
                                                type="text"
                                                id='agroquimico'
                                                name='agroquimico'
                                                placeholder='nombre del agroquimico'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={agroquimico}
                                                onChange={handleChange(setAgroquimico)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="fecha"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Fecha
                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                                </svg>
                                            </label>
                                            <input 
                                                type="datetime-local"
                                                id='fecha'
                                                name='fecha'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={fecha}
                                                onChange={handleChange(setFecha)}
                                            />
                                        </div>
                                        {msg && <Alerta alerta={alerta}/>}
                                        <div className="mt-4 flex justify-center">
                                            <button type='submit' className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'>Confirmar
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}



