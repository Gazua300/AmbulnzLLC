import { Request, Response } from 'express'
import { con } from '../data/connection'



export const userById = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const [user] = await con('case_fullstack_login').where({
      id: req.params.id
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
