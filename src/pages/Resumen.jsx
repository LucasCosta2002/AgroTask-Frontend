import TableRow from "../Components/TableRow"

const Resumen = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Resumen</h1>
                <input type="date" className=" p-2 rounded-md shadow-md"/>
            </div>
        
            <div className="overflow-auto rounded-lg shadow-md mb-4">
                <table className="w-full bg-white">
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

                    {/* <tbody className="">
                        <TableRow/>
                        <TableRow/>
                        <TableRow/>
                        <TableRow/>
                        <TableRow/>
                    </tbody> */}
                </table>
            </div>

            <div className="flex md:justify-end justify-center">
                <button className='bg-green-600 p-2 mt-3 md:mt-0 text-white rounded-md font-bold transition-colors shadow-md hover:bg-green-700 flex gap-2'>
                    Descargar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default Resumen