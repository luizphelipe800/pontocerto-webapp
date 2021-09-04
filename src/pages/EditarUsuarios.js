import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import * as yup from 'yup'
import Api from '../services/Api'
import ToastNotify from '../utils/ToastNotify'
import Navbar from "../components/Navbar"

const schema = yup.object().shape({
    nome: yup.string().required('Está faltando o nome!'),
    email: yup.string().email().required('Está Faltando o email!'),
    entrada: yup.string().required('preciso do seu horário de entrada'),
    saida: yup.string().required('preciso do seu horario de saída')
})

const EditarUsuarios = () => {
    const [form, setForm] = useState({ nome:'', email:'', funcao: '1', entrada: '', saida: '' })
    const [loading, setLoading] = useState(false)
    const { userId } = useParams()
    const history = useHistory()

    const handleOnChange = ev => {
        setForm(f => ({ ...form, [ev.target.name]: ev.target.value }))
    }

    const handleOnSubmit = async ev => {
        ev.preventDefault()
        try {
            const validForm = await schema.validate(form)

            const { entrada, saida } = validForm
            const body = { ...validForm, expediente: { entrada, saida }}

            await Api.put(`/usuarios/${userId}`, body)
            setLoading(true)
            ToastNotify('Usuário Atualizado!', 'BOTTOM_RIGHT', 'success')
            setTimeout(() => history.replace('/usuarios'), 5000)

        } catch (error) {
            ToastNotify(error.message, 'BOTTOM_RIGHT', 'error')
            setLoading(false)    
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Api.get(`/usuarios/${userId}`)
                const { entrada, saida } = data.expediente
                setForm(f => ({ ...f, ...data, entrada, saida }))
            } catch (error) {
                ToastNotify(error.message, 'BOTTOM_RIGHT', 'error')
                setLoading(false)  
            }
        })()
    }, [userId])

    return (
        <div className="custom-container">
            <Navbar/>
            <div className="h-full flex justify-center items-center">
                <form className="w-1/2 flex flex-col" onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        name="nome" 
                        className="input-text"
                        placeholder="Nome Completo"
                        onChange={handleOnChange}
                        value={form.nome}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        className="input-text"
                        placeholder="Email"
                        onChange={handleOnChange}
                        value={form.email}
                    />
                    <select 
                        name="funcao" 
                        className="mb-5 p-3 outline-none border border-black bg-white font-light"
                        onChange={handleOnChange}
                        value={form.funcao}
                    >
                        <option value="1">Gerente</option>
                        <option value="2">Funcionário</option>
                    </select>
                    
                    <div className="mb-5 flex justify-between">
                        <div>
                            <label htmlFor="entrada">Horário Entrada</label>
                            <input 
                                type="time" 
                                name="entrada" 
                                id="entrada" 
                                className="ml-3 px-4 py-2 border border-black"
                                onChange={handleOnChange}
                                value={form.entrada}
                            />
                        </div>
                        <div>
                            <label htmlFor="saida">Horário Saída</label>
                            <input 
                                type="time" 
                                name="saida" 
                                id="saida" 
                                className="ml-3 px-4 py-2 border border-black"
                                onChange={handleOnChange}
                                value={form.saida}
                            />
                        </div>
                    </div>

                    <button  className="submit-button bg-green-400 px-5" type="submit">
                        <ClipLoader color="#ffffff" loading={loading} size={16} />
                        { !loading && 'Salvar Usuário' }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditarUsuarios