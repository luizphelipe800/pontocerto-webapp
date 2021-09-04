import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Clock from '../components/Clock'

const Home = () => {

    return (
        <div className="custom-container">
            <Navbar/>
            <Header/>
            <Clock/>
        </div>
    )
}

export default Home