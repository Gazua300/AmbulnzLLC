import { con } from '../data/connection'
import { Authentication } from '../services/Authentication'
import { Request, Response } from 'express'

export const signupADM = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, email, password, passConfirm } = req.body

    if(!name || !email || !password || !passConfirm){
      statusCode = 401
      throw new Error('Preencha todos os campos!')
    }

    if(
      email.indexOf('@') === -1
      ||
      email.indexOf('.') === -1
    ){
      statusCode = 403
      throw new Error('Digite um email válido!')
    }

    if(password !== passConfirm){
      statusCode = 403
      throw new Error('As senhas não conferem!')
    }

    const [user] = await con('case_fullstack_adm').where({
      email
    })

    if(user){
      statusCode = 403
      throw new Error('Email já cadastrado')
    }

    const id = new Authentication().generateId()
    const hash = new Authentication().hash(password)

    await con('case_fullstack_adm').insert({
      id,
      name,
      email,
      password: hash
    })

    const token = new Authentication().token(id)

    res.status(200).send({ access_token: token })
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
