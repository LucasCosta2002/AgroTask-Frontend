import { Link } from "react-router-dom";
import { formatearFecha } from "../helpers/formatearFecha";

const TableRow = ({trabajo}) => {

    const {cliente, ubicacion, hectareas, agroquimico, fecha, _id} = trabajo;

    return (
        <tr className="text-gray-900 border-b-2">
            <td className="px-6 py-4 text-center">{cliente}</td>
            <td className="px-6 py-4 text-center">{ubicacion}</td>
            <td className="px-6 py-4 text-center">{hectareas}</td>
            <td className="px-6 py-4 text-center">{agroquimico}</td>
            <td className="px-6 py-4 text-center">{formatearFecha(fecha)} Hs</td>
            <td className="px-6 py-4 flex justify-center items-center ">
            <Link to={`${_id}`} className="bg-gray-300 p-2 rounded-md text-gray-500 flex gap-2 hover:bg-gray-400 hover:text-white transition-all" >Ver
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </Link>
            </td>
        </tr>
    )
}

export default TableRow