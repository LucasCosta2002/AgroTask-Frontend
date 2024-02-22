import { formatearFecha } from "../helpers/formatearFecha";
import Buttons from "./Buttons";

const TableRow = ({trabajo}) => {

    const {cliente, ubicacion, hectareas, agroquimico, fecha} = trabajo;

    return (
        <tr className="text-gray-900 border-b-2">
            <td className="px-6 py-4 text-center">{cliente.nombre}</td>
            <td className="px-6 py-4 text-center">{ubicacion}</td>
            <td className="px-6 py-4 text-center">{hectareas}</td>
            <td className="px-6 py-4 text-center">{agroquimico}</td>
            <td className="px-6 py-4 text-center">{formatearFecha(fecha)} Hs</td>
            <td className="px-6 py-4 flex justify-center items-center ">
                <Buttons trabajo={trabajo}/> 
            </td>
        </tr>
    )
}

export default TableRow