import { api } from "../axios"

export interface IAmount{
        id:number;
        id_cliente:number;
        valor_total:number;
        data_de_compra:Date;
}

interface IAmountData{
    data:IAmount[]
} 
const getByAmount=async():Promise<IAmount[] | Error>=>{

    try {
        const {data}=await api.get("/venda") 

        if(data)  return data
        return new Error("Erro ao listar as vendas")
        
    } catch (error) {
        return new Error("Erro ao listar os registros!")
    }
}


export const SalesService={
getByAmount
}