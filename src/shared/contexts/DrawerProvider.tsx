import { createContext, useCallback, useContext, useState } from "react";


interface IDrawerOptionData{
    path:string;
    icon:string;
    label:string;
    onclick?:()=>void;
}

interface IDrawerOption{
    option?:IDrawerOptionData[];
    isOpen:boolean;
    handleOption:(options:IDrawerOptionData[])=>void;
    handleOpen:()=>void;
}
const DrawerContext=createContext({} as IDrawerOption)

export const useDrawer=()=>{
    return useContext(DrawerContext);
}

interface IDrawerProvider{
    children:React.ReactNode;
}

export const DrawerProvider:React.FC<IDrawerProvider>=({children})=>{

    const [option,setOption]=useState<IDrawerOptionData[]>();
    const[isOpen,setIsOpen]=useState(false)

    const handleOpen=useCallback(()=>{
        setIsOpen((oldIsOpen)=>!oldIsOpen);
    },[])

    const handleOption=useCallback((options:IDrawerOptionData[])=>{
        setOption(options)
    },[])

    return (
        <DrawerContext.Provider value={{handleOpen,isOpen,option,handleOption}}>
            {children}
        </DrawerContext.Provider>
    )
}