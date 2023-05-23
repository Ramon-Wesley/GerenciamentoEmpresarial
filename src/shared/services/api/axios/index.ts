import axios from 'axios';
import { ErrorInterceptor,ResultInterceptors } from './interceptors';
import { error } from 'console';
import { Environment } from '../../../environments';

const api= axios.create({
    baseURL:Environment.BASE_URL
})

api.interceptors.response.use(
    (response)=>ResultInterceptors(response),
    (error)=>ErrorInterceptor(error)
)

export {api}