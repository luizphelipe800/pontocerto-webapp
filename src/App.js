import Routes from './Routes'
import { ToastContainer } from 'react-toastify'

const App = () => (
    <>
        <Routes/>
        <ToastContainer limit={1}/>
    </>
)

export default App;
