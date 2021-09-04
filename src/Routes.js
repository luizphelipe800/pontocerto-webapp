import { isAuthenticated } from './services/Auth';
import { AnimatedSwitch } from 'react-router-transition'
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Main from './pages/Main'
import AdicionarUsuario from './pages/AdicionarUsuario'
import ListarUsuarios from './pages/ListarUsuarios'
import EditarUsuarios from './pages/EditarUsuarios'
import Relatorio from './pages/Relatorio'

const PublicRoutes = ({ children, ...rest }) => {
    return <Route
        { ...rest }
        render={({ location }) => (
            !isAuthenticated() ? (
                children
            ) : (
                <Redirect to={{ pathname: '/home', state: { from: location } }}/>
            ) 
        )}
    />
}

const PrivateRoutes = ({ children, ...rest }) => {
    return <Route
        { ...rest }
        render={({ location }) => (
            isAuthenticated() ? (
                children
            ) : (
                <Redirect to={{ pathname: '/', state: { from: location } }}/>
            )
        )}
    />
}

const Routes = () => (
    <BrowserRouter>
        <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
        >
            <PublicRoutes exact path='/'>
                <Main/>
            </PublicRoutes>
            <PublicRoutes path='/login/:funcao'>
                <Login/>
            </PublicRoutes>

            <PrivateRoutes path='/home'>
                <Home/>
            </PrivateRoutes>

            <PrivateRoutes exact path='/usuarios/add'>
                <AdicionarUsuario/>
            </PrivateRoutes>

            <PrivateRoutes path='/usuarios/:userId'>
                <EditarUsuarios/>
            </PrivateRoutes>

            <PrivateRoutes path='/usuarios'>
                <ListarUsuarios/>
            </PrivateRoutes>

            <PrivateRoutes path='/relatorio/:userId'>
                <Relatorio/>
            </PrivateRoutes>
        </AnimatedSwitch>
    </BrowserRouter>
)

export default Routes