import { BiEditAlt, BiHotel } from 'react-icons/bi'

const HistoricoTable = ({ pontos }) => {
	const handleOnVacation = ev => { }

	return (
		<div className="border border-black shadow bg-white">
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
										onClick={handleOnVacation}
									>
										<BiHotel />
									</button>
									<button className="submit-button font-light px-4 ml-3 text-xl" title="Editar">
										<BiEditAlt />
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

export default HistoricoTable