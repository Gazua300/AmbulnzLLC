import { Request, Response } from 'express'
import { con } from '../data/connection'


export const deleteOrder = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [pizza] = await con('case_fullstack_orders').where({
            id: req.params.id
        })
        
        
        await con('case_fullstack_orders').where({
            id:req.params.id
        }).del()

        
        res.status(200).send(`Pedido de pizza sabor ${pizza.pizza} excluido.`)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}