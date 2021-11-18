import { v4 } from 'uuid'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import bcrypt from 'bcryptjs'


config()


export class Authentication {
  generateId = ()=>{
    return v4()
  }

  token = (payload:string | JwtPayload)=>{
    return jwt.sign(
      { payload },
      process.env.JWT_KEY as string,
      { expiresIn: '10h'}
    )
  }

  tokenData = (token:string)=>{
    try{

      return jwt.verify(
        token,
        process.env.JWT_KEY as string
      )

    }catch(e:any){
      console.log(e)
      return e
    }
  }

  hash = (txt:string)=>{
    const rounds = 12
    const salt = bcrypt.genSaltSync(rounds)
    const cypher = bcrypt.hashSync(txt, salt)

    return cypher
  }

  compare = (txt:string, hash:string)=>{
    return bcrypt.compareSync(txt, hash)
  }

}
