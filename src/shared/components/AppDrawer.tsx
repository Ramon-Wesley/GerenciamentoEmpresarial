import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useDrawer } from "../contexts/DrawerProvider";
import { deepOrange } from "@mui/material/colors";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useThemeContext } from "../contexts";
import { useAuthContext } from "../contexts/AuthProvider";


interface IAppList{
    icon:string;
    path:string;
    label:string;
    onclick?:()=>void;
}

export const AppList:React.FC<IAppList>=({icon,label,onclick,path})=>{
    const pathResolve=useResolvedPath(path);
    const mathResolve=useMatch({path:pathResolve.pathname,end:false})
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate(path);
        onclick?.();
    }

    return(
        <>
        <Divider/>
        <ListItemButton selected={!!mathResolve} onClick={handleNavigate}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
        </>
    )
}

interface IAppDrawer{
    children:React.ReactNode
}
export const AppDrawer:React.FC<IAppDrawer>=({children})=>{
    const theme=useTheme()
    const smDown= useMediaQuery(()=>theme.breakpoints.down("sm"));
    const {option,isOpen,handleOpen}=useDrawer();
    const {toogleTheme}=useThemeContext()
    const {logout}=useAuthContext()
    return(
        <>
        <Drawer open={isOpen} variant={smDown?"temporary":"permanent"} onClose={handleOpen}>

<Box width={theme.spacing(28)}
 display="flex" 
flexDirection="column">
    <Box height={theme.spacing(15)} 
    display="flex"
     justifyContent="center"
      alignItems="center">
    <Avatar  sx={{ bgcolor: deepOrange[500],height:theme.spacing(10),width:theme.spacing(10)}}>R</Avatar>
    </Box>
    <Box flex={1}>
            <List>
                {option?.map((op,key)=>(
                    <AppList
                        key={key}
                        icon={op.icon}
                        label={op.label}
                        path={op.path}
                        onclick={smDown ? handleOpen : undefined}
                    />
                    
                    ))}
            </List>
                    </Box>
                    <Divider/>
                    <Box>
                        <List>
                            <ListItemButton onClick={toogleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Trocar tema"/>
                            </ListItemButton>
                            <Divider/>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <Icon>logout</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Sair"/>
                            </ListItemButton>
                        </List>
                    </Box>
</Box>
        </Drawer>
        <Box marginLeft={smDown?theme.spacing(0):theme.spacing(28)}>
        {children}
        </Box>
            
        </>
    )
}