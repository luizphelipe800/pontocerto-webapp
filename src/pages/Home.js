import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Clock from '../components/Clock'

const Home = () => {

    return (
        <div className="bg-gray-50 h-screen p-6 font-light">
            <Navbar/>
            <Header/>
            <Clock/>
        </div>
    )
}

export default Home