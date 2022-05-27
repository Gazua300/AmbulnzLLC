import { Request, Response } from 'express'
import { con } from '../data/connection'


export const pizzaByName = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const name = req.body.name

        if(!name){
            statusCode = 401
            throw new Error('Especifique o sabor!')
        }

        const [pizza] = await con('case_fullstack_pizza').where({
            name
        })

        if(!pizza){
            statusCode = 403
            throw new Error(`${name} não encontrado`)
        }

        res.status(200).send(pizza)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}