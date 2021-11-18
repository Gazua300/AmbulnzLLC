import { Request, Response } from 'express'
import { con } from '../data/connection'


export const showPizzas = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const pizzas = await con('case_fullstack_pizza')

    res.status(200).send(pizzas)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
