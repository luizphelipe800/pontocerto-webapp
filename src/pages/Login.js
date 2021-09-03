import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { login } from '../services/Auth'
import ToastNotify from '../utils/ToastNotify'
import Api from '../services/Api'

import { ClipLoader } from 'react-spinners'

const Login = () => {
    const [ credentials, setCredentials ] = useState({ email: '', senha: '' })
    const [ loading, setLoading ] = useState(false)
    const { funcao } = useParams()
    const history = useHistory()

    const handleOnSubmit = async ev => {
        ev.preventDefault()
        try{
            const { data } = await Api.post('/sessions', credentials)
            await login(data)
            setLoading(true)
            setTimeout(() => history.replace('/home'), 3000)
        }catch(error){
            ToastNotify(error.response.data, 'TOP_CENTER', 'error')
            setLoading(false)
        }
    }

    

    const handleOnChange = ev => {
        setCredentials(c => ({ ...c, [ev.target.name]: ev.target.value }) )
    }

    return (
        <div className="bg-gray-50 h-screen grid p-4 font-light ">
            <div>
                <h1 className="text-3xl">PontoCerto</h1>
            </div>
            <div className="grid grid-cols-1 lg:w-1/3 sm:w-1/2 place-self-start justify-self-center p-3">
                <h1 className="text-center text-4xl mb-5">Faça o Login</h1>
                <form onSubmit={handleOnSubmit} className="flex flex-col">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                        required 
                        onChange={handleOnChange}
                        value={credentials.email}
                        className="font-light mb-3 border border-black text-center h-10 placeholder-black outline-none"
                    />
                    <>
                    {
                    funcao === '1' &&
                    <input 
                        type="password" 
                        name="senha" 
                        placeholder="senha" 
                        required
                        onChange={handleOnChange}
                        value={credentials.senha}
                        className="font-light mb-5 border border-black text-center h-10 placeholder-black outline-none"
                    />
                    }
                    </>
                    <button type="submit" className="border border-black h-10 shadow bg-green-400 hover:bg-green-500 flex justify-center items-center">
                        <ClipLoader color="#ffffff" loading={loading} size={16} />
                        { !loading && 'Login' }
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Login