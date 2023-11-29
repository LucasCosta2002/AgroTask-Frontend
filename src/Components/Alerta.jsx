
const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'bg-red-500' : 'bg-green-500'} text-center p-3 rounded-xl uppercase text-white font-bold text-sm  shadow-md`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta