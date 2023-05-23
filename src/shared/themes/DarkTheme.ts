import { createTheme } from "@mui/material";
import { cyan, purple } from "@mui/material/colors";



export const DarkTheme=createTheme({
    palette:{
      mode:"dark",
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
            paper:'#0C0C0C',
            default:'#020202'
        }
        
    },
    typography:{
        allVariants:{
            color:"#FFFFFF"
        }
    }
    
    
})