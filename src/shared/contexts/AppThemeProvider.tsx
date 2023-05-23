import { ThemeContext } from "@emotion/react";
import { Box, ThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { DarkTheme, LightTheme } from "../themes";


interface IAppThemeContext{
    themeName:"dark"| "light"
    toogleTheme:()=>void;
}

const AppThemeContext=createContext({} as IAppThemeContext);

interface IAppThemeProvider{
    children:React.ReactNode
}

export const AppThemeProvider:React.FC<IAppThemeProvider>=({children})=>{
    const [themeName,setThemeName]=useState<"dark"|"light">("dark");

    const toogleTheme=useCallback(()=>{
        setThemeName((oldTheme)=>oldTheme === "light"?"dark":"light")
    },[])

    const theme=useMemo(()=>{
        if(themeName === 'light') return LightTheme
        return DarkTheme
    },[themeName])
    return(
        <AppThemeContext.Provider value={{themeName,toogleTheme}}>
            <ThemeProvider theme={theme}>
                    <Box width="100vw" height="100vh" margin="0" bgcolor={theme.palette.background.default}>
                        {children}
                    </Box>
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}
    export const useThemeContext=()=>{
        return useContext(AppThemeContext);
    }