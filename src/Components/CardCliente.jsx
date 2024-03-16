import { Link } from "react-router-dom";
import { Edit, Delete } from "./Icons";
import useClients from "../Hooks/useClients";
import ModalClientDelete from "./ModalClientDelete";

// eslint-disable-next-line react/prop-types
const CardClient = ({client}) => {

    const {handleModalDelete, handleModalEdit} = useClients();

    const {name, phone, cuil, _id} = client;

    return (
        <>
            <div className="bg-white md:w-1/4 rounded-lg shadow-md">
                <div className="bg-mi-verde rounded-t-lg p-2 flex justify-end gap-4 ">
                    <Link onClick={ () => handleModalEdit(client)} className="bg-indigo-500 text-white rounded-md p-1 hover:bg-indigo-600 transition-all">
                        <Edit />
                    </Link>
                    <button onClick={handleModalDelete} className="bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition-all">
                        <Delete />
                    </button>
                </div>
                <div className="px-3 py-2">
                    <p className="mb-3">Nombre: <span className="font-semibold">{name}</span></p>
                    <p className="mb-3">Telefono: <span className="font-semibold">{phone}</span></p>
                    <p className="mb-3">CUIL: <span className="font-semibold">{cuil}</span></p>
                </div>
            </div>
            <ModalClientDelete id={_id}/>
        </>
    )
}

export default CardClient