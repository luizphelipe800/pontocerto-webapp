import Axios from 'axios'
import { getToken } from './Auth'

const Api = Axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

Api.interceptors.request.use(config => {
    try{
        const item = getToken()

        if(item) config.headers.Authorization = `Bearer ${item.token}`

        return config
    }catch(error){
        console.log(error.message)
    }
})

export default Api