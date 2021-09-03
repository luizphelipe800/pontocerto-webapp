import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { BiEditAlt, BiHotel, BiExport, BiFilterAlt } from 'react-icons/bi'
import Api from '../services/Api'
import Navbar from '../components/Navbar'

const currentDate = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd')

const Historico = () => {
    const [ pontos, setPontos ] = useState([])
    const [ nome, setNome ] = useState('Somebody')
    const [ date, setDate ] = useState({ inicio: currentDate, final: currentDate})
    const [ total, setTotal ] = useState('')
    const { userId } = useParams()

    const handleOnFilter = async ev => {
        ev.preventDefault()
        try{
            const query = `?inicio=${date.inicio}&final=${date.final}`
            const { data } = await Api.get(`/relatorios/${userId}${query}`)

            const { nome, historico, total } = data

            setPontos(historico)
            setNome(nome)
            setTotal(total)
        }catch(error){
            console.log(error)
        }
        
    }

    const handleOnExport = ev => {}
    const handleOnVacation = ev => {}

    const handleOnDateChange = ev => {
        setDate(d => ({ ...d, [ev.target.name]: ev.target.value }))
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Api.get(`/relatorios/${userId}`)
                const { nome, historico, total } = data
                setPontos(historico)
                setNome(nome)
                setTotal(total)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [userId])

    if(!nome || !pontos) return <p>Loading...</p>

    return (
        <div className="h-screen p-6 bg-gray-100 font-light flex flex-col">
            <Navbar/>
            <h1 className="my-10 text-2xl">{ `${nome} - Histórico de Pontos` }</h1>
            <div className="flex justify-between mb-10">
                <form className="flex" onSubmit={handleOnFilter}>
                    <input 
                        className="mr-3 border border-black p-2" 
                        type="date" 
                        name="inicio"
                        onChange={handleOnDateChange}
                        value={date.inicio}
                    />
                    <input 
                        className="mr-3 border border-black p-2" 
                        type="date" 
                        name="final"
                        onChange={handleOnDateChange}
                        value={date.final}
                    />
                    <button 
                        className="submit-button font-light px-4 mr-3" 
                        title="Filtrar"
                        type="submit"
                    >
                        <BiFilterAlt/>
                    </button>
                </form>
                <button 
                    className="submit-button font-light px-4 ml-3 bg-indigo-400" 
                    title="Exportar"
                    onClick={handleOnExport}
                >
                    <BiExport/>
                </button>
            </div>
            <div>
                {
                    pontos.map(ponto => (
                        <div key={ponto._id} className="flex flex-row border-b border-gray-500 justify-between items-center py-4 mb-5">
                            <p>{ ponto.data }</p>
                            <p>{ ponto.horarios[0] }</p>
                            <p>{ ponto.horarios[1] }</p>
                            <p>{ ponto.horarios[2] }</p>
                            <p>{ ponto.horarios[3] }</p>
                            <p>{ ponto.feriado ? 'feriado' : 'comum' }</p>
                            <p>{ ponto.total }</p>
                            <div className="flex">
                                <button 
                                    className="submit-button font-light px-4 ml-3 bg-green-400" 
                                    title="Folga"
                                    onClick={handleOnVacation}
                                >
                                    <BiHotel/>
                                </button>
                                <button className="submit-button font-light px-4 ml-3" title="Editar">
                                    <BiEditAlt/>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Historico