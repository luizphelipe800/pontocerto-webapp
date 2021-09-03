import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiEditAlt, BiX } from 'react-icons/bi'
import Navbar from "../components/Navbar"
import Api from '../services/Api'

const cargos = ['Gestor', 'Funcionário']

const ListaUsuarios = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await Api.get('/usuarios')
            setUsers(data)
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
                        <div key={user._id} className="flex flex-row border-b-2 border-gray-300 justify-between items-center p-4 mb-5">
                            <p>{user.nome}</p>
                            <p>{ cargos[user.funcao - 1] }</p>
                            <div className="flex flex-row">
                                <Link className="submit-button font-light px-4 ml-3">histórico de ponto</Link>
                                <button className="submit-button font-light px-4 ml-3" title="Editar">
                                    <BiEditAlt/>
                                </button>
                                <button className="submit-button font-light bg-red-300 hover:bg-red-400 px-4 ml-3" title="Apagar">
                                    <BiX/>
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