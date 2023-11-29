import CardCliente from "../Components/CardCliente"

const Clientes = () => {
	return (
		<>
			<div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Resumen</h1>
				<button className='bg-green-600 p-2 mt-3 md:mt-0 text-white rounded-md font-bold transition-colors shadow-md hover:bg-green-700 flex gap-2'>Nuevo Cliente</button>
            </div>

			<div className="container flex flex-col md:flex-wrap md:flex-row gap-3 justify-around">
				<CardCliente/>
				<CardCliente/>
				<CardCliente/>
				<CardCliente/>
				<CardCliente/>
				<CardCliente/>
			</div>
		</>
	)
}

export default Clientes