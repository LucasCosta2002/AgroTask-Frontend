import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useWorks from '../Hooks/useWorks'

export default function ModalEliminarTrabajo({work}) {

    const {handleModalEliminarTrabajo, modalEliminarTrabajo, eliminarTrabajo} = useWorks()    

    return (
        <>
            <Transition appear show={modalEliminarTrabajo } as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleModalEliminarTrabajo}>
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
                        <div className="flex min-h-full items-center justify-center p-3 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >¿Deseas eliminar este trabajo?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Si borrás este trabajo no hay forma de recuperarlo.</p>
                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="bg-red-600 text-white font-bold p-2 rounded-md hover:bg-red-700 transition-all"
                                            onClick={()=> eliminarTrabajo(work._id)}
                                        >Estoy Seguro
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}