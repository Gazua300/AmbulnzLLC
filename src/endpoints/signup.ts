import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'
import { Request, Response } from 'express'

export const signup = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, phone, address, password } = req.body

    if(!name || !phone || !address || !password){
      statusCode = 401
      throw new Error('Preencha todos os campos!')
    }

    
    const convert = String(phone).split('')
    if(convert.length !== 11){
        statusCode = 403
        throw new Error('Número de telefone inválido!')
    }


    const [user] = await con('case_fullstack_login').where({
      phone
    })

    if(user){
      statusCode = 403
      throw new Error('Telefone já cadastrado')
    }

    const id = new Authentication().generateId()
    const hash = new Authentication().hash(password)

    await con('case_fullstack_login').insert({
      id,
      name,
      phone,
      address,
      password: hash
    })

    const token = new Authentication().token(id)

    res.status(200).send({ access_token: token })
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
