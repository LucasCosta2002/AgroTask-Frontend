import CardCliente from "../Components/CardCliente"
import useClients from "../Hooks/useClients.jsx";

const Clients = () => {

    const { handleModalClient, clients } = useClients();

	return (
		<>
			<div className="flex justify-end items-center mb-4">
				<button 
					className='bg-green-600 p-2 mt-3 md:mt-0 text-white rounded-md font-bold transition-colors shadow-md hover:bg-green-700 flex gap-2'
					onClick={() => handleModalClient()}
				>Nuevo Cliente
				</button>
            </div>

			<div className="container flex flex-col md:flex-wrap md:flex-row gap-3 justify-around">
				{clients && clients?.map(client => (
					<CardCliente key={client._id} client={client}/>
				))}
			</div>
		</>
	)
}

export default Clients