import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import useWorks from '../Hooks/useWorks.jsx'
import useClients from '../Hooks/useClients.jsx'
import Alerta from './Alerta.jsx'

//Icons
import { Person, Location, Hectares, Product, Date } from './Icons.jsx'

export default function ModalWork() {

    const {modalWork, changeModalWork, alerta, mostrarAlerta, submitWork, work} = useWorks();

    const { clients } = useClients();

    const [id, setId] = useState(null)
    const [client, setClient] = useState("")
    const [location, setLocation] = useState('')
    const [hectares, setHectares] = useState('')
    const [agrochemical, setAgrochemical] = useState('')
    const [date, setDate] = useState('')

    //Compruebo si hay un trabajo
    useEffect(()=>{
		if(work?._id){
            setId(work._id)
			setClient(work.client._id);
			setLocation(work.location);
			setHectares(work.hectares);
			setAgrochemical(work.agrochemical);
			setDate(work.date);
            return
		}

        setId(null)
		setClient("")
		setLocation('')
		setHectares('')
		setAgrochemical('')
		setDate('')
	},[work])

    // nuevo: se crea una funcion que toma un state y le asignamos el evento
    const handleChange = setState => e =>{
        setState(e.target.value)
    }
    
    const handleSubmit = async e =>{
        e.preventDefault()

        if ([client, location, hectares, agrochemical, date].includes("")) {
            mostrarAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }

        await submitWork({id, client, location, hectares, agrochemical, date})
		setClient('')
		setHectares('')
		setLocation('')
		setAgrochemical('')
		setDate('')
    }
    
    const {msg} = alerta;

    return (
        <>
            <Transition appear show={modalWork} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={changeModalWork}>
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
                                        <div className='mb-4 '>
                                            <label 
                                                htmlFor="client"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            > Cliente <Person/>
                                            </label>
                                            <select 
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                onChange={ handleChange(setClient) }    
                                                value={client}
                                                disabled={work.client ? true : false}
                                            >
                                                <option value="" disabled>-- Seleccione -- </option>
                                                {clients?.map( client => (
                                                    <option key={client._id} value={client._id}>
                                                        {client.name}
                                                    </option>
                                                    ))
                                                }
                                            </select>    
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="location"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Ubicación
                                                <Location/>
                                            </label>
                                            <input 
                                                type="text"
                                                id='location'
                                                name='location'
                                                placeholder='nombre de la ubicacion'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={location}
                                                onChange={handleChange(setLocation)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="hectares"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Hectareas
                                                <Hectares/>
                                            </label>
                                            <input 
                                                type="number"
                                                id='hectares'
                                                name='hectares'
                                                placeholder='número de hectareas'
                                                min={0}
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={hectares}
                                                onChange={handleChange(setHectares)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="agrochemical"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/4'
                                            >Agroquimico
                                                <Product/>
                                            </label>
                                            <input 
                                                type="text"
                                                id='agrochemical'
                                                name='agrochemical'
                                                placeholder='nombre del agroquimico'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={agrochemical}
                                                onChange={handleChange(setAgrochemical)}
                                                />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="date"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Fecha
                                                <Date/>
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id='date'
                                                name='date'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={date}
                                                onChange={handleChange(setDate)}
                                            />
                                        </div>
                                        {msg && <Alerta alerta={alerta}/>}
                                        <div className="mt-4 flex justify-center">
                                            <button type='submit' className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'>{id ? "Editar" : "Crear"}
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
