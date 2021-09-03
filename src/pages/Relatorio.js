import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { BiExport, BiFilterAlt } from 'react-icons/bi'
import Api from '../services/Api'
import Navbar from '../components/Navbar'
import HistoricoTable from '../components/HistoricoTable'
import ToastNotify from '../utils/ToastNotify'

const currentDate = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd')

const Relatorio = () => {
	const [reload, setReload] = useState(false)
	const [pontos, setPontos] = useState([])
	const [nome, setNome] = useState('Somebody')
	const [date, setDate] = useState({ inicio: currentDate, final: currentDate })
	const [total, setTotal] = useState('')
	const { userId } = useParams()

	const handleOnFilter = async ev => {
		ev.preventDefault()
		try {
			const query = `?inicio=${date.inicio}&final=${date.final}`
			const { data } = await Api.get(`/relatorios/${userId}${query}`)

			const { nome, historico, total } = data

			setPontos(historico)
			setNome(nome)
			setTotal(total)
		} catch (error) {
			console.log(error)
		}

	}

	const handleOnReload = value => setReload(value)

	const handleOnExport = async ev => {
		try {
			const { data } = await Api.post('/relatorios', { dados: pontos }, {
					responseType: 'arraybuffer'
				}
			)
			const url = window.URL.createObjectURL(new Blob([data]))

			const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${nome}-${date.inicio}-${date.final}.xlsx`)
      document.body.appendChild(link)
      link.click()

			ToastNotify('Download Sendo Preparado!', 'BOTTOM_RIGHT', 'success')
		} catch (error) {
			ToastNotify(error.message, 'BOTTOM_RIGHT', 'error')
		}
	}
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
				setReload(false)
			} catch (error) {
				ToastNotify(error.message, 'BOTTOM_RIGHT', 'error')
				setReload(false)
			}
		})()
	}, [userId, reload])

	if (!nome || !pontos) return <p>Loading...</p>

	return (
		<div className="h-screen p-6 bg-gray-50 font-light flex flex-col">
			<Navbar />
			<div className="my-10 flex justify-between items-center">
				<h1 className="text-2xl">{`${nome} - Histórico de Pontos`}</h1>
				<h1>{`Banco de Horas: ${total}`}</h1>
			</div>
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
						<BiFilterAlt />
					</button>
				</form>
				<button
					className="submit-button font-light px-4 ml-3 bg-indigo-400"
					title="Exportar"
					onClick={handleOnExport}
				>
					<BiExport />
				</button>
			</div>
			<HistoricoTable pontos={pontos} handleOnReload={handleOnReload} />
		</div>
	)
}

export default Relatorio