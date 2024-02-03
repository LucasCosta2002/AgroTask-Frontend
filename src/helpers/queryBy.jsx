import clienteAxios from "../config/clienteAxios.jsx"

export const queryBy = async (verb, url, object ) => {

    try {
        const token = localStorage.getItem("token");
        if(!token) return;
        
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        let response;
        //segun el tipo de peticion (get, post, put, delete)
        switch (verb) {
            case "post":
                response = await clienteAxios.post(url, object, config)
                break;
            case "put":
                response = await clienteAxios.put(url, object, config)
                break;
            case "delete":
                response = await clienteAxios.delete(url, object, config)
                break;
            default:
                response = await clienteAxios.get(url, config)
                break;
        }

        return response.data;
    } catch (error){
        console.log(error);
    }
}