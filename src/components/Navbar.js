import { useState } from 'react'
import { getUser, logout } from '../services/Auth'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {
    const [user] = useState(() => getUser())
    const history = useHistory()

    const handleOnLogout = async () => {
        await logout()
        history.replace('/')
    }

    return (
        <nav className="flex flex-row justify-between items-center">
            <div>
                <Link className="text-3xl" to="/">PontoCerto</Link>
            </div>
            <div className="flex flex-row justify-between">
                {
                    user.funcao === 1 &&
                    <>
                    <Link className="border font-normal border-black py-1 px-3 bg-yellow-300 hover:bg-yellow-400 shadow text-center" to="/usuarios/add">Adicionar Funcionário</Link>
                    <Link className="border font-normal ml-5 border-black py-1 px-3 bg-yellow-300 hover:bg-yellow-400 shadow text-center" to="/usuarios">Funcionários</Link>
                    </>
                }
                <button onClick={handleOnLogout} className="font-extrabold ml-5">Sair</button>
            </div>
        </nav>
    )
}

export default Navbar