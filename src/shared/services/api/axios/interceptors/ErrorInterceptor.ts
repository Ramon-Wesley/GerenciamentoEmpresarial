import {AxiosError} from 'axios'


export const ErrorInterceptor=(error:AxiosError)=>{

    if(error.message === "Network Error"){
        return Promise.reject(new Error("Erro na conexão!"))
    }
    if(error.response?.status === 404){

    }

    return Promise.reject(error);
}