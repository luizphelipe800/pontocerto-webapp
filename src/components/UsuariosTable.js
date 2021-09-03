import { BiEditAlt, BiUserMinus, BiSpreadsheet } from "react-icons/bi"
import { Link } from 'react-router-dom'

const cargos = ['Gestor', 'Funcionário']

const UsuariosTable = ({ usuarios }) => {
	return (
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
									<Link className="submit-button font-normal text-xl px-4 ml-3" to={`/relatorio/${usuario._id}`} title="Histórico de Ponto">
										<BiSpreadsheet/>
									</Link>
									<Link className="submit-button font-light px-4 ml-3 text-xl" title="Editar" to={`/usuarios/${usuario._id}`}>
										<BiEditAlt />
									</Link>
									<button className="submit-button font-light bg-red-400 px-4 ml-3 text-xl" title="Apagar">
										<BiUserMinus />
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default UsuariosTable