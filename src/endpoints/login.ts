import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'
import { Request, Response } from 'express'

export const login = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { phone, password } = req.body

    if(!phone || !password){
      statusCode = 401
      throw new Error('Preencha todos os campos!')
    }


    const [user] = await con('case_fullstack_login').where({
      phone
    })

    if(!user){
      statusCode = 404
      throw new Error('Usuário não encontrado!')
    }

    const compare = new Authentication().compare(password, user.password)

    if(!compare){
      statusCode = 404
      throw new Error('Usuário não encontrado!')
    }


    const token = new Authentication().token(user.id)

    res.status(200).send({ access_token: token })
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
