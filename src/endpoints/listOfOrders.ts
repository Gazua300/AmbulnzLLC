import { Request, Response } from 'express'
import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'


export const listOfOrders = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)

    if(!token){
      statusCode = 401
      throw new Error('Token inválido, expirado ou ausente do headers.')
    }

    const [user] = await con('case_fullstack_adm').where({
      id: tokenData.payload
    })

    if(!user){
      statusCode = 403
      throw new Error('Você deve estar logado!')
    }

    const orders = await con('case_fullstack_orders')

    res.status(200).send(orders)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
