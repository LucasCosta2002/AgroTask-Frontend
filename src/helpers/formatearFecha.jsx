
export const formatearFecha = (fecha = "") =>{
    const nuevaFecha = new Date(fecha.split('T'))
    const opciones = {
        month: 'numeric',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    return nuevaFecha.toLocaleString('es-ES', opciones)
}