import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import useClients from '../Hooks/useClients'
import Alerta from './Alerta';


const ModalClient = () => {

    const { client, modalClient, handleModalClient, showAlert, alert, submitClient } = useClients();


    const [ id, setId ] = useState(""); 
    const [ name, setName ] = useState("");
    const [ cuil, setCuil ] = useState("");
    const [ phone, setPhone ] = useState("");

    // toma un state y le asignamos el evento
    const handleChange = setState => e =>{
        setState(e.target.value)
    }

    const HandleSubmit = async e => {
        e.preventDefault();

        if ([name, cuil, phone].includes("")){
            showAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        await submitClient({id, name, cuil, phone});

        setId("");
        setName("");
        setCuil("");
        setPhone("");
    }

    useEffect(() => {
        //para evitar el error de component incontrolabele
        if (client?._id){
            setId(client._id);
            setName(client.name);
            setCuil(client.cuil);
            setPhone(client.phone);
            return
        }
    
        //limpiar el state cada vez que sea un nuevo cliente
        setId("");
        setName("");
        setCuil("");
        setPhone("");
    }, [client])

    const {msg}  = alert;

    return (
        <>
            <Transition appear show={modalClient} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleModalClient}>
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
                                <form onSubmit={HandleSubmit}>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="nombre"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Nombre
                                            </label>
                                            <input 
                                                type="text"
                                                id='nombre'
                                                name='nombre'
                                                placeholder='nombre del cliente'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={name}
                                                onChange={handleChange(setName)}
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="CUIL"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >CUIL
                                            </label>
                                            <input 
                                                type="text"
                                                id='CUIL'
                                                name='CUIL'
                                                placeholder='numero de CUIL'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                value={cuil}
                                                onChange={handleChange(setCuil)}
                                                maxLength="11"
                                                minLength="10"
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label 
                                                htmlFor="phone"
                                                className='flex items-center justify-center gap-3 p-2 bg-mi-verde text-white font-bold rounded-md mb-3 w-2/5 md:w-1/3'
                                            >Telefono
                                            </label>
                                            <input 
                                                type="text"
                                                id='phone'
                                                name='phone'
                                                placeholder='numero de telefono'
                                                className='w-full p-2 rounded-md text-gray-600 border'
                                                maxLength="13"
                                                minLength="9"
                                                value={phone}
                                                onChange={handleChange(setPhone)}
                                            />
                                        </div>
                                        {msg && <Alerta alerta={alert}/>}
                                        <div className="mt-4 flex justify-center">
                                            <button type='submit' className='shadow-md bg-green-600 p-3 md:p-2 font-bold text-white text-center rounded-md hover:bg-green-700 transition-all text-xl md:text-base'> {id ? "Editar" : "Crear"}
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

export default ModalClient