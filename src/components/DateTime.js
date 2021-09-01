import { useState, useEffect } from 'react'

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const DateTime = () => {
    const [date] = useState(() => {
        const date = new Date()
        return { dia: date.getDate(), mes: months[date.getMonth()], ano: date.getFullYear()}
    })

    const [time, setTime] = useState(() => new Date().toLocaleTimeString())

    useEffect(() => {
        const timeId = setInterval(() => setTime(() => new Date().toLocaleTimeString()), 1000)
        return () => {
            clearInterval(timeId)
        }
    }, [])

    return (
        <div>
            <h3>{`${date.dia} ${date.mes} ${date.ano} - ${time}`}</h3>
        </div>
    )
}

export default DateTime