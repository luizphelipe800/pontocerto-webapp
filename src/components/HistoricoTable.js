import { BiEditAlt, BiHotel, BiRun } from 'react-icons/bi'
import { useState } from 'react'
import Modal from 'react-modal'
import Api from '../services/Api'
import ToastNotify from '../utils/ToastNotify'

const HistoricoTable = ({ pontos, handleOnReload }) => {
	const [pontoId, setPontoId] = useState(null)
	const [horas, setHoras] = useState({ entrada: '', almoco: '', retorno: '', final: ''})

	const handleOnOpen = (pontoId, horas) => {
		const [entrada, almoco, retorno, final] = horas
		setPontoId(pontoId)
		setHoras({entrada, almoco, retorno, final})
	}
	const handleOnClose = () => setPontoId(null)

	const handleOnSubmit = async ev => {
		ev.preventDefault()
		try {
			const horarios = Object.values(ev.target).slice(0, 4).map(hora => hora.value)
			await Api.put(`/pontos/${pontoId}`, { horarios })
			ToastNotify('Horário Corrigido!', 'BOTTOM_RIGHT', 'success')
			handleOnReload(true)
			handleOnClose()
		} catch (error) {
			ToastNotify(error.message, 'BOTTOM_RIGHT', 'error')
		}
	}

	const handleOnChange = ev => {
		setHoras(horas => ({ ...horas, [ev.target.name]: ev.target.value}))
	}

	const handleOnVacation = async (pontoId, folga) => {
		try {
			await Api.put(`/pontos/${pontoId}`, { feriado: !folga })
			ToastNotify('Folga Atualizada!', 'BOTTOM_RIGHT', 'success')
			handleOnReload(true)
		} catch (error) {
			ToastNotify(error.response.data, 'BOTTOM_RIGHT', 'error')
		}
	}

	return (
		<>
		<div className="border border-black shadow bg-white w-full">
			<table className="divide-y divide-black w-full">
				<thead className="">
					<tr>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Data</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Entrada</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Entrada Almoço</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Retorno Almoço</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Saida</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Folga</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Saldo</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-black">
					{
						pontos.map(ponto => (
							<tr key={ponto._id}>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.data}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.horarios[0]}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.horarios[1]}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.horarios[2]}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.horarios[3]}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.feriado ? 'sim' : 'não'}</td>
								<td className="px-4 py-2 whitespace-nowrap">{ponto.total}</td>
								<td className="px-4 py-2 whitespace-nowrap flex justify-end">
									<button
										className="submit-button font-light px-4 ml-3 bg-green-400 text-xl"
										title="Folga"
										onClick={() => handleOnVacation(ponto._id, ponto.feriado)}
									>
										{ponto.feriado ? <BiRun /> : <BiHotel/>}
									</button>
									<button 
										className="submit-button font-light px-4 ml-3 text-xl" 
										title="Editar"
										onClick={() => handleOnOpen(ponto._id, ponto.horarios)}
									>
										<BiEditAlt />
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
		<Modal
			isOpen={Boolean(pontoId)}
			onRequestClose={handleOnClose}
			ariaHideApp={false}
			className="modal"
		>
			<h1 className="font-light text-2xl mb-5">Correção de Horas</h1>
			<form onSubmit={handleOnSubmit}>
				<div className="mb-5">
					<table>
						<thead>
							<tr>
								<th className="text-sm text-left uppercase font-light tracking-wider">Inicio Expediente</th>
								<th className="text-sm text-left uppercase font-light tracking-wider">Saida Almoço</th>
								<th className="text-sm text-left uppercase font-light tracking-wider">Retorno Almoço</th>
								<th className="text-sm text-left uppercase font-light tracking-wider">Fim Expediente</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input 
										className="border border-black p-2 whitespace-nowrap"
										onChange={handleOnChange}
										type="time" 
										value={horas.entrada}
										name="entrada"
									/>
								</td>
								<td>
									<input 
										className="border border-black p-2 whitespace-nowrap" 
										onChange={handleOnChange}
										type="time" 
										value={horas.almoco} 
										name="almoco"
									/>
								</td>
								<td>
									<input 
										className="border border-black p-2 whitespace-nowrap" 
										onChange={handleOnChange}
										type="time" 
										value={horas.retorno}
										name="retorno"
									/>
								</td>
								<td>
									<input 
									className="border border-black p-2 whitespace-nowrap" 
									onChange={handleOnChange}
									type="time" 
									value={horas.final} 
									name="final"
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex justify-between items-center">
					<button onClick={handleOnClose} className="submit-button p-4">Agora Não</button>
					<button type="submit" className="submit-button p-4 bg-green-400">Salvar Correção</button>
				</div>
			</form>
		</Modal>
		</>
	)
}

export default HistoricoTable