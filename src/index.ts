import express from 'express'
import cors from 'cors'
import { signupADM } from './endpoints/signupADM'
import { loginADM } from './endpoints/loginADM'
import { showPizzas } from './endpoints/showPizzas'
import { createOrder } from './endpoints/createOrder'
import { listOfOrders } from './endpoints/listOfOrders'
import { orderById } from './endpoints/orderById'
import { Authentication } from './services/Authentication'

const app = express()
app.use(express.json())
app.use(cors())



app.post('/signup', signupADM)
app.post('/login', loginADM)
app.post('/orders', createOrder)
app.get('/orders', listOfOrders)
app.get('/orders/:id', orderById)
app.get('/pizzas', showPizzas)


// const id = new Authentication().generateId()
// console.log('id:', id)
// const token = new Authentication().token(id)
// console.log('token:', token)
// const tokenData = new Authentication().tokenData(token)
// console.log('tokenData:', tokenData)
// const hash = new Authentication().hash('senha')
// console.log('Senha:', hash)
// const compare = new Authentication().compare('senha', hash)
// console.log('Cripto senha:', compare)






app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server running at 3003')
})
