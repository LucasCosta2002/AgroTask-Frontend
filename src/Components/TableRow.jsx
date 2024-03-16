import { formatearFecha } from "../helpers/formatearFecha";
import Buttons from "./Buttons";

// eslint-disable-next-line react/prop-types
const TableRow = ({work}) => {

    return (
        <tr className="text-gray-900 border-b-2">
            <td className="px-6 py-4 text-center">{work.client.name}</td>
            <td className="px-6 py-4 text-center">{work.location}</td>
            <td className="px-6 py-4 text-center">{work.hectares}</td>
            <td className="px-6 py-4 text-center">{work.agrochemical}</td>
            <td className="px-6 py-4 text-center">{formatearFecha(work.date)} Hs</td>
            <td className="px-6 py-4 flex justify-center items-center ">
                <Buttons work={work}/> 
            </td>
        </tr>
    )
}

export default TableRow