import ModalConfirmar from "../Components/ModalConfirmar"
import ModalTrabajo from "../Components/ModalTrabajo"
import TableRow from "../Components/TableRow"
import useTrabajos from "../Hooks/useTrabajos"

const Trabajos = () => { //outlet

    const {trabajos} = useTrabajos()
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Mis Trabajos</h1>
                <input type="date" className=" p-2 rounded-md shadow-md"/>
            </div>
        
            <div className="overflow-auto rounded-lg shadow-md mb-4">
                <table className="w-full bg-white ">
                    <thead className="bg-mi-verde text-center">
                        <tr>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Cliente</th>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Ubicación</th>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Hectareas</th>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Producto</th>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Fecha</th>
                            <th scope="col" className="px-6 py-2 font-bold text-white text-xl">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {trabajos[0]?.map(trabajo=>(
                            <TableRow 
                                key={trabajo._id}
                                trabajo={trabajo}
                            />
                        ))} 
                    
                    </tbody>
                </table>
            </div>
            <ModalTrabajo/> 

        </>
    )
}

export default Trabajos