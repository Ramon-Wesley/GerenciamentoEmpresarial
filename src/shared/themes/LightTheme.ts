import { createTheme } from "@mui/material";
import { cyan, purple } from "@mui/material/colors";



export const LightTheme=createTheme({
    palette:{
        primary:{
            light:purple[400],
            main:purple[500],
            dark:purple[700],
            contrastText:'#FFFFFF'
        },
        secondary:{
            light:cyan[400],
            main:cyan[500],
            dark:cyan[700],
            contrastText:'#FFFFFF'
        },
        background:{
            paper:'#FFFFFF',
            default:'#FCFCFC'
        },
        
    },
    typography:{
        allVariants:{
            
        }
    }
    
    
})