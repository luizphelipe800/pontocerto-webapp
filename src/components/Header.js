import { useState } from 'react'
import { getUser } from '../services/Auth'

import DateTime from './DateTime'

const Header = () => {
    const [user] = useState(() => getUser())
    return (
        <header>
            <h1>Bem Vindo {user.nome}, já bateu o ponto hoje?</h1>
            <DateTime/>
        </header>
    )
}

export default Header