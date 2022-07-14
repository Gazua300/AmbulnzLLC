import { Request, Response } from 'express'
import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'



export const userById = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)

    if(!token){
      statusCode = 401
      throw new Error('Token inválido, expirado ou ausente dos headers')
    }


    const [user] = await con('case_fullstack_login').where({
      id: tokenData.payload
    })
    
    if(!user){
      statusCode = 404
      throw new Error('Usuário não encontrado.')
    }

    res.status(200).send(user)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
