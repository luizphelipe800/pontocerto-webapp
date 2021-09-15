import Modal from 'react-modal'
import Api from '../services/Api'
import { useState } from 'react'
import { BiEditAlt, BiUserMinus, BiSpreadsheet } from "react-icons/bi"
import { Link } from 'react-router-dom'
import ToastNotify from '../utils/ToastNotify'

const cargos = ['Gestor', 'Funcionário']

const UsuariosTable = ({ usuarios, handleOnReload }) => {
	const [ userId, setUserId ] = useState(null)

	const handleOnOpen = userId => setUserId(userId)
	const handleOnClose = () => setUserId(null)

	const handleOnRemove = async () => {
		try{
			await Api.delete(`/usuarios/${userId}`)
			ToastNotify('Usuário Retirado da Equipe!', 'BOTTOM_RIGHT', 'success')
			handleOnReload(true)
			setUserId(null)
		}catch(error){
			ToastNotify(error.response.data, 'BOTTOM_RIGHT', 'error')
			setUserId(null)
		}
	}

	return (
		<>
		<div className="border border-black shadow bg-white">
			<table className="divide-y divide-black w-full">
				<thead className="">
					<tr>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Nome</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Função</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider">Expediente</th>
						<th className="px-4 py-2 text-left uppercase font-normal text-xs tracking-wider"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-black">
					{
						usuarios.map(usuario => (
							<tr key={usuario._id}>
								<td className="px-4 py-2 whitespace-nowrap">{usuario.nome}</td>
								<td className="px-4 py-2 whitespace-nowrap">{cargos[usuario.funcao - 1]}</td>
								<td className="px-4 py-2 whitespace-nowrap">{`${usuario.expediente.entrada} até ${usuario.expediente.saida}`}</td>
								<td className="px-4 py-2 whitespace-nowrap flex justify-end">
									<Link className="submit-button font-normal text-xl px-4 ml-3 bg-gray-50" to={`/relatorio/${usuario._id}`} title="Histórico de Ponto">
										<BiSpreadsheet/>
									</Link>
									<Link className="submit-button font-light px-4 ml-3 text-xl bg-gray-50" title="Editar" to={`/usuarios/${usuario._id}`}>
										<BiEditAlt />
									</Link>
									<button 
										className="submit-button font-light bg-red-400 px-4 ml-3 text-xl" 
										title="Apagar"
										onClick={() => handleOnOpen(usuario._id)}
									>
										<BiUserMinus />
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
		<Modal 
			isOpen={Boolean(userId)}
			className="modal"
			onRequestClose={handleOnClose}
			ariaHideApp={false}
		>
			<h1 className="text-2xl font-light mb-5">Tem certeza que deseja realizar essa operação?</h1>
			<div className="flex justify-between items-center">
				<button className="submit-button px-4" onClick={handleOnClose}>Melhor Não</button>
				<button className="submit-button px-4 bg-green-400" onClick={handleOnRemove}>Sim, Tenho!</button>
			</div>
		</Modal>
		</>
	)
}

export default UsuariosTable