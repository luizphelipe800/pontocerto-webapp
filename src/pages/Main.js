import { Link } from 'react-router-dom'

const Main = () => {
    return (
        <div className="h-screen bg-gray-100 p-8 flex flex-col font-light">
            <div className="h-20 flex items-center">
                <h1 className="text-3xl">PontoCerto</h1>
            </div>
            <div className="flex flex-row h-full">
                <div className="w-1/2 flex flex-col justify-center">
                    <h1 className="font-light text-5xl mb-5">Bem Vindo ao Ponto Certo</h1>
                    <p className="font-thin text-2xl w-4/3">Tenha controle dos horários dos seus funcionarios e veja sua produtividade decolar &#x1F680;</p>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-thin mb-5">Olá, me diz qual a sua função</h1>
                    <Link to="/login/1" className="bg-indigo-400 font-normal border border-black w-1/2 text-center py-2 shadow mb-3">Gestor</Link>
                    <Link to="/login/2" className="bg-yellow-400 font-normal border border-black w-1/2 text-center py-2 shadow">Funcionário</Link>
                </div>
            </div>
        </div>
    )
}

export default Main