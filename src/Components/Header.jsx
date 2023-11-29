
const Header = () => {
    return (
        <header className='p-5'>
            <div className='md:flex-row flex flex-col gap-4 md:justify-between md:items-center text-center'>
                <h1 className='text-5xl text-green-600 font-bold uppercase mb-3 md:mb-0'>AgroTask</h1>
                <div className='md:w-1/2 shadow-md'>
                    <input type='text' placeholder="Buscar" className="rounded-md p-2 w-full text-slate-300"/>
                </div>
                <button className='bg-red-600 p-2 mt-3 md:mt-0 text-white rounded-md font-bold transition-colors shadow-md hover:bg-red-700'>Cerrar Sesion</button>
            </div>
        </header>
    )
}

export default Header