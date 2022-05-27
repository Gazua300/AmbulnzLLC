import { Request, Response } from 'express'
import { con } from '../data/connection'


export const editOrder =async (req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const { pizza, price, quantity } = req.body

        if(!pizza || !price || !quantity){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const [order] = await con('case_fullstack_orders').where({
            id: req.params.id
        })

        await con('case_fullstack_orders').update({
            pizza,
            price,
            quantity,
            total: price * quantity
        }).where({
            id: req.params.id
        })


        res.status(200).send('Alterações realizadas com sucesso!')
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
    
}
