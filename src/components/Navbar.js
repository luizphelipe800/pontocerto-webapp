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
        <nav>
            <div>
                <Link to="/">PontoCerto</Link>
            </div>
            <div>
                {
                    user.funcao === 1 &&
                    <>
                    <Link to="/">Adicionar Funcionário</Link>
                    </>
                }
                <button onClick={handleOnLogout}>Sair</button>
            </div>
        </nav>
    )
}

export default Navbar