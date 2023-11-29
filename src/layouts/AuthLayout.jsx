import { Outlet } from "react-router-dom"

//layout o plantilla que va a tener los forms de registrar, olvide password o ingresar
//outlet: form de cada seccion

const AuthLayout = () => {
    return (
        <main className="container mx-auto p-10 md:py-5 md:flex md:justify-center bg-imagen">
            <div className="md:w-2/3 lg:w-2/5">
                <h1 className="text-center text-6xl md:mb-3 md:my-0 mb-5 text-green-600 font-black uppercase">AgroTask</h1>
                <Outlet/>
            </div>
        </main>
    )
}

export default AuthLayout