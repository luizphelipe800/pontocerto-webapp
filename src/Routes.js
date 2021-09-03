import { isAuthenticated } from './services/Auth';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Main from './pages/Main'
import AdicionarUsuario from './pages/AdicionarUsuario'
import ListarUsuarios from './pages/ListarUsuarios';

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
        <Switch>
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

            <PrivateRoutes path='/usuarios'>
                <ListarUsuarios/>
            </PrivateRoutes>
        </Switch>
    </BrowserRouter>
)

export default Routes