import { Request, Response } from 'express'
import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'


export const insertPizza = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, price, ingredients, photo} = req.body

    if(!name || !price || !ingredients || !photo){
      statusCode = 401
      throw new Error('Preencha os campos.')
    }

    const id = new Authentication().generateId()

    await con('case_fullstack_pizza').insert({
      id,
      name,
      price,
      ingredients,
      photo
    })

    res.status(200).send(`Pizza ${name} adicionada.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
