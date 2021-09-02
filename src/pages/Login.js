import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../services/Auth'
import Api from '../services/Api'

import { PropagateLoader } from 'react-spinners'

const Login = () => {
    const [ credentials, setCredentials ] = useState({ email: '', senha: '' })
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    const handleOnSubmit = async ev => {
        ev.preventDefault()
        try{
            const { data } = await Api.post('/sessions', credentials)
            await login(data)
            setLoading(true)
            setTimeout(() => history.replace('/home'), 3000)
        }catch(error){
            console.log(error.response.data)
            setLoading(false)
        }
    }

    const handleOnChange = ev => {
        setCredentials(c => ({ ...c, [ev.target.name]: ev.target.value }) )
    }

    return (
        <div className="bg-gray-100 h-screen grid p-4 font-light ">
            <div>
                <h1 className="text-3xl">PontoCerto</h1>
            </div>
            <div className="grid grid-cols-1 w-1/3 place-self-start justify-self-center p-3">
                <h1 className="text-center text-4xl mb-5">Faça o Login</h1>
                <form onSubmit={handleOnSubmit} className="flex flex-col">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                        required 
                        onChange={handleOnChange}
                        value={credentials.email}
                        className="font-light mb-3 border border-black text-center h-10 bg-transparent placeholder-black"
                    />

                    <input 
                        type="password" 
                        name="senha" 
                        placeholder="senha" 
                        required
                        onChange={handleOnChange}
                        value={credentials.senha}
                        className="font-light mb-5 border border-black text-center h-10 bg-transparent placeholder-black"
                    />

                    <button type="submit" className="border border-black h-10 shadow bg-green-400 hover:bg-green-500 flex justify-center items-center">
                        <PropagateLoader color="#ffffff" loading={loading} size={4} />
                        { !loading && 'Login' }
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Login