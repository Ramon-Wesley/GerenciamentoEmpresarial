import { Box, Card, CardContent, CardHeader, Paper, Typography, useTheme } from "@mui/material"
import { LayoutBase } from "../shared/layouts/LayoutBase"
import { useCallback, useEffect, useState } from "react"
import { motion } from 'framer-motion';
import { IAmount, SalesService } from "../shared/services/api/sales/SalesServices"
import {Line} from "react-chartjs-2"





export const Dashboard:React.FC=()=>{
    const data = [
        { label: 'Janeiro', value: 12 },
        { label: 'Fevereiro', value: 19 },
        { label: 'Março', value: 3 },
        { label: 'Abril', value: 5 },
        { label: 'Maio', value: 2 },
        { label: 'Junho', value: 3 },
      ];
    const [amount,setAmount]=useState<IAmount[]>();
    const [totalSale,setTotalSale]=useState<number>(0);
    const theme=useTheme()

    useEffect(()=>{
        SalesService.getByAmount().then((res)=>{
            if(res instanceof Error){
                    console.log(res.message)
            }else
                setAmount(res)
            })
    },[])
    useEffect(()=>{
        let reset=0;
        amount?.map((am)=> setTotalSale(reset+=am.valor_total))
    },[amount])

    return(
        <LayoutBase
        title="Dashboard"
        ><Box>
            <Card sx={{width:theme.spacing(26),height:theme.spacing(12)}}>
                <CardContent>
                    <Typography variant="h5">Venda Mensal</Typography>
                    <Typography>{totalSale}</Typography>
                </CardContent>
            </Card>
            </Box>

            <Box display="flex" padding={theme.spacing(1)} marginTop={theme.spacing(10)} width={theme.spacing(40)} component={Paper} alignItems="flex-end">
            {data.map((item, index) => (
                <>
                <Box display="flex" height="100%" flexDirection="column" alignItems="flex-end">

                <Typography>{item.label}</Typography>
                <motion.div
                key={index}
                style={{
                    height: item.value * 10, // Altura da barra proporcional ao valor
                    width: '20px',
                    background: 'blue',
                    margin: '0 10px',
                }}
                initial={{ opacity: 0, y: 50 }} // Animação inicial
                animate={{ opacity: 1, y: 0 }} // Animação ao ser exibido
                transition={{ duration: 1, delay: index * 0.2 }} // Duração e atraso da animação
                >
        </motion.div>
                    </Box>
                    </>
      ))}
      </Box>
            </LayoutBase>
    )
}