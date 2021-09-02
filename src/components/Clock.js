import { useEffect, useState } from 'react'
import Api from '../services/Api'

const Clock = () => {
    const [ponto, setPonto] = useState({})

    const handleOnClick = async () => {
        try{
            const time = new Date().toLocaleTimeString().split(':')
            await Api.post('/pontos', { horario: `${time[0]}:${time[1]}` })
        }catch(error){
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        (async () => {
            const { data } = await Api.get('/pontos')
            setPonto(data)
        })()
    }, [])

    if(!ponto.horarios) return <p>Loading...</p>

    return (
        <div>
            <button onClick={handleOnClick}>Bater Ponto</button>
            <div>
                <div>
                    <p>inicio de expediente</p>
                    <p>{ ponto.horarios[0] ? ponto.horarios[0] : 'não batido' }</p>
                </div>
                <div>
                    <p>almoço</p>
                    <p>{ ponto.horarios[1] ? ponto.horarios[1] : 'não batido' }</p>
                </div>
                <div>
                    <p>retorno almoço</p>
                    <p>{ ponto.horarios[2] ? ponto.horarios[2] : 'não batido' }</p>
                </div>
                <div>
                    <p>fim de expediente</p>
                    <p>{ ponto.horarios[3] ? ponto.horarios[3] : 'não batido' }</p>
                </div>
            </div>
        </div>
    )
}

export default Clock