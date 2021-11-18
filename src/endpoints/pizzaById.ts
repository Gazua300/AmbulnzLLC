import { Request, Response } from 'express'
import { con } from '../data/connection'



export const pizzaById = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const [pizza] = await con('case_fullstack_pizza').where({
      id: req.params.id
    })

    if(!pizza){
      statusCode = 404
      throw new Error('Dados inválidos ou pedido inexistente.')
    }

    res.status(200).send(pizza)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
