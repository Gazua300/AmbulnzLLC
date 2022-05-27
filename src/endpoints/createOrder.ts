import { Request, Response } from 'express'
import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'


export const createOrder = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { pizza, quantity } = req.body
    const currentTime = new Date()

    if(!pizza || !quantity){
      statusCode = 401
      throw new Error('Dados inválidos, por favor verifique os campos e tente novamente.')
    }

    const [checkPizza] = await con('case_fullstack_pizza').where({
      name: pizza
    })

    if(!checkPizza){
      statusCode = 404
      throw new Error('Pizza não encontrada no cardápio.')
    }

    const id = new Authentication().generateId()

    await con('case_fullstack_orders').insert({
      id,
      pizza,
      price: checkPizza.price,
      quantity,
      total: checkPizza.price * quantity,
      date: currentTime.toLocaleDateString()
    })

    res.status(200).send('Pedido realizado com sucesso!')
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
