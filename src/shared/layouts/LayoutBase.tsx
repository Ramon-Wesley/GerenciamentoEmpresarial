import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { AppDrawer } from "../components/AppDrawer"
import { useDrawer } from "../contexts/DrawerProvider";




interface ILayoutBase{
    children:React.ReactNode
    title:string;
}

export const LayoutBase:React.FC<ILayoutBase>=({children,title})=>{
const theme =useTheme()
const smDown=useMediaQuery(()=>theme.breakpoints.down("sm"))
const {handleOpen}=useDrawer()

    return(
        <>
        <Box display="flex" marginLeft={!smDown?theme.spacing(6): 0} gap={theme.spacing(4)} paddingTop={theme.spacing(4)} flexDirection="column">

        <Box display="flex" >
            {smDown &&(
                <IconButton onClick={handleOpen}>
                    <Icon>menu</Icon>
                </IconButton>
            )
        }
            <Typography>{title}</Typography>
        </Box>
        <Box>{children}</Box>
        </Box>
        
        </>
    )
}