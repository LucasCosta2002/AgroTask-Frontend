import useWorks from "../Hooks/useWorks";
import ModalEliminarTrabajo from "./ModalEliminarTrabajo.jsx";

import { Edit, Delete, Download } from './Icons.jsx'
import { Link } from "react-router-dom";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatearFecha } from "../helpers/formatearFecha.jsx";
import InvoiceWork from "./Exports/InvoiceWork.jsx";

// eslint-disable-next-line react/prop-types
const Buttons = ({work}) => {

    const {handleModalEditWork, handleModalEliminarTrabajo} = useWorks();
    const dateFormated = formatearFecha(work.date);

    return (
        <>
            <div className="flex gap-2">
                <div className="group relative flex flex-col items-center justify-center">
                    <Link onClick={() => handleModalEditWork(work)} className="bg-indigo-500 p-2 rounded-md text-white  hover:bg-indigo-600 transition-all" >
                        <Edit />
                    </Link>
                    <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                        <div className="flex max-w-xs flex-col items-center">
                            <div className="rounded bg-indigo-500 p-2 text-xs text-center shadow-lg">Editar</div>
                            <div className="clip-bottom h-2 w-4 bg-indigo-500"></div>
                        </div>
                    </div>
                </div>

                <PDFDownloadLink document={<InvoiceWork work={work}/>} fileName={`${dateFormated}.pdf`}>
                    { () =>
                        <div className="group relative flex flex-col items-center justify-center">
                            <button className="bg-green-600 p-2 rounded-md text-white hover:bg-green-700 transition-all " >
                                <Download />
                            </button>
                            <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                                <div className="flex max-w-xs flex-col items-center">
                                    <div className="rounded bg-green-500 p-2 text-xs text-center shadow-lg">Descargar</div>
                                    <div className="clip-bottom h-2 w-4 bg-green-500"></div>
                                </div>
                            </div>
                        </div>
                    }
                </PDFDownloadLink>

                <div className="group relative flex flex-col items-center justify-center">
                    <button onClick={() => handleModalEliminarTrabajo(work)} className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition-all " >
                        <Delete />
                    </button>
                    <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom rounded text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                        <div className="flex max-w-xs flex-col items-center">
                            <div className="rounded bg-red-500 p-2 text-xs text-center shadow-lg">Borrar</div>
                            <div className="clip-bottom h-2 w-4 bg-red-500"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ModalEliminarTrabajo work={work}/>
        </>     
    )
}

export default Buttons