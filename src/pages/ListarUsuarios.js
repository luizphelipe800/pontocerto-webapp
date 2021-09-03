import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiEditAlt, BiUserMinus } from 'react-icons/bi'
import Navbar from "../components/Navbar"
import Api from '../services/Api'

const cargos = ['Gestor', 'Funcionário']

const ListaUsuarios = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Api.get('/usuarios')
                setUsers(data)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [])

    if(!users) return <p>Loading...</p>

    return (
        <div className="h-screen p-6 bg-gray-100 font-light flex flex-col">
            <Navbar/>
            <h1 className="text-4xl my-10 mb-5">Funcionários</h1>
            <div>
                {
                    users.map(user => (
                        <div key={user._id} className="flex flex-row border-b border-gray-500 justify-between items-center py-4 mb-5">
                            <p className="text-xl">{user.nome}</p>
                            <p className="text-xl">{ cargos[user.funcao - 1] }</p>
                            <div className="flex flex-row">
                                <Link className="submit-button bg-indigo-400 font-normal px-4 ml-3" to={`/historico/${user._id}`}>
                                    histórico de ponto
                                </Link>
                                <button className="submit-button font-light px-4 ml-3" title="Editar">
                                    <BiEditAlt/>
                                </button>
                                <button className="submit-button font-light bg-red-400 px-4 ml-3" title="Apagar">
                                    <BiUserMinus/>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListaUsuarios