import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Auth } from "../services/api/auth";


interface IAuthDataContext{
    logout:()=>void;
    isAuthenticated:boolean;
    login:(email:string,senha:string)=>Promise<string | void>
}
const AuthContext=createContext({} as IAuthDataContext);
export const  LOCAL_STORAGE_KEY="APP_ACCESS_TOKEN";


interface IAuthProvider{
    children:React.ReactNode
}


export const AuthProvider:React.FC<IAuthProvider>=({children})=>{
    const [token,setToken]=useState<string>();

    useEffect(()=>{
        //localStorage.removeItem(LOCAL_STORAGE_KEY)
        const result:string | null=localStorage.getItem(LOCAL_STORAGE_KEY)
        if(result){
            setToken(JSON.parse(result))
        }else{
            setToken(undefined)
        }
    },[])

    const login=useCallback(async(email:string, password:string)=>{

        const result = await Auth(email,password)

        if(result instanceof Error){
            return result.message
        }else{
            localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(result.accessToken))
            setToken(result.accessToken)
        }
    },[])
    const isAuthenticated=useMemo(()=>!!token,[token])

    const logout=useCallback(()=>{
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        setToken(undefined)
    },[])
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
                {children}
            </AuthContext.Provider>
    )
    
    
    
}
export const useAuthContext=()=>{
    return useContext(AuthContext);
}