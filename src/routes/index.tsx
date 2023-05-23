import {Routes,Route, Navigate} from 'react-router-dom'
import { useDrawer } from '../shared/contexts/DrawerProvider'
import { useEffect } from 'react'
import { Dashboard } from '../pages/Dashboard'



export const AppRoutes = ()=>{
const {handleOption}=useDrawer()
useEffect(()=>{

    handleOption([{
        icon:"house",
        label:"pagina-inicial",
        path:"/pagina-inicial",
    },
    {
        icon:"sell",
        label:"Vendas",
        path:"/vendas",
    }
    
])
},[])
    return(

        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            <Route path='*' element={<Navigate to="/pagina-inicial"/>} />
        </Routes>
    )
}