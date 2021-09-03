import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Api from '../services/Api'
import UsuariosTable from '../components/UsuariosTable'


const ListaUsuarios = () => {
    const [users, setUsers] = useState([])
    const [reload, setReload] = useState(false)

    const handleOnReload = value => setReload(value)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Api.get('/usuarios')
                setUsers(data)
                setReload(false)
            } catch (error) {
                console.log(error.message)
                setReload(false)
            }
        })()
    }, [reload])

    if(!users) return <p>Loading...</p>

    return (
        <div className="h-screen p-6 bg-gray-50 font-light flex flex-col">
            <Navbar/>
            <h1 className="text-2xl my-10">Funcionários</h1>
            <UsuariosTable usuarios={users} handleOnReload={handleOnReload}/>
        </div>
    )
}

export default ListaUsuarios