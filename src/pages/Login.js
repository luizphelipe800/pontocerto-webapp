import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../services/Auth'
import Api from '../services/Api'

const Login = () => {
    const [ credentials, setCredentials ] = useState({ email: '', senha: '' })
    const history = useHistory()

    const handleOnSubmit = async ev => {
        ev.preventDefault()
        try{
            const { data } = await Api.post('/sessions', credentials)
            await login(data)
            history.replace('/home')
        }catch(error){
            console.log(error.response.data)
        }
    }

    const handleOnChange = ev => {
        setCredentials(c => ({ ...c, [ev.target.name]: ev.target.value }) )
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email..." 
                    required 
                    onChange={handleOnChange}
                    value={credentials.email}
                />

                <input 
                    type="password" 
                    name="senha" 
                    placeholder="senha..." 
                    required
                    onChange={handleOnChange}
                    value={credentials.senha}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login