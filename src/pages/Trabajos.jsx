import TableRow from "../Components/TableRow"
import useWorks from "../Hooks/useWorks"
import InvoiceWorks from "../Components/Exports/InvoiceWorks"

import { Download } from "../Components/Icons"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useState } from "react"

const Trabajos = () => { //outlet

    const {works, loading} = useWorks();

    const [ month, setMonth ] = useState("");

    return (
        <>
            {loading ? 
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
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">Mis Trabajos</h1>
                        <div className="flex gap-2 items-center">
                            <input type="month" className=" p-2 rounded-md shadow-md" onChange={ e => setMonth(e.target.value)}/>
                            <PDFDownloadLink document={<InvoiceWorks work={works}/>} fileName={`${month}.pdf`}>
                                { () =>
                                    <button className="flex gap-2 items-center bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all " >
                                        <Download /> Descargar todos
                                    </button>
                                }
                            </PDFDownloadLink>
                        </div>
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
                                {works?.map(work=>(
                                    <TableRow 
                                        key={work._id}
                                        work={work}
                                    />
                                ))} 
                            </tbody>
                        </table>
                    </div>
                </>
           }
        </>
    )
}

export default Trabajos