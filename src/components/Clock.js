import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import ToastNotify from '../utils/ToastNotify'
import Api from '../services/Api'

const Clock = () => {
    const [ponto, setPonto] = useState({})
    const [pontoBatido, setPontoBatido] = useState(false)

    const handleOnClick = async () => {
        try{
            const time = new Date().toLocaleTimeString().split(':')
            await Api.post('/pontos', { horario: `${time[0]}:${time[1]}` })
            setPontoBatido(true)
        }catch(error){
            ToastNotify(error.response.data, 'BOTTOM_RIGHT')
        }
    }

    useEffect(() => {
        (async () => {
            const { data } = await Api.get('/pontos')
            setPonto(data)
            setTimeout(() => setPontoBatido(false), 3000)
        })()
    }, [pontoBatido])

    if(!ponto.horarios) return <p>Loading...</p>

    return (
        <div className="flex flex-col items-center mt-10">
            <button onClick={handleOnClick} className="border border-black  shadow bg-green-400 hover:bg-green-500 flex justify-center items-center px-4 py-2 h-10 w-1/3">
                <ClipLoader color="#ffffff" loading={pontoBatido} size={16} />
                { !pontoBatido && 'Bater Ponto' }
            </button>
            <div className="flex flex-row justify-between items-center p-8 w-full mt-6">
                <div className="text-center ">
                    <p className="font-normal text-2xl mb-2">inicio de expediente</p>
                    <p className="font-thin text-5xl">{ ponto.horarios[0] ? ponto.horarios[0] : 'não batido' }</p>
                </div>
                <div className="text-center text-2xl">
                    <p className="font-normal text-2xl mb-2">almoço</p>
                    <p className="font-thin text-5xl">{ ponto.horarios[1] ? ponto.horarios[1] : 'não batido' }</p>
                </div>
                <div className="text-center text-2xl">
                    <p className="font-normal text-2xl mb-2">retorno almoço</p>
                    <p className="font-thin text-5xl">{ ponto.horarios[2] ? ponto.horarios[2] : 'não batido' }</p>
                </div>
                <div className="text-center text-2xl">
                    <p className="font-normal text-2xl mb-2">fim de expediente</p>
                    <p className="font-thin text-5xl">{ ponto.horarios[3] ? ponto.horarios[3] : 'não batido' }</p>
                </div>
            </div>
        </div>
    )
}

export default Clock