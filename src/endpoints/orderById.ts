import { Request, Response } from 'express'
import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'



export const orderById = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const [order] = await con('case_fullstack_orders').where({
      id: req.params.id
    })

    if(!order){
      statusCode = 404
      throw new Error('Dados inválidos ou pedido inexistente.')
    }

    res.status(200).send(order)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
