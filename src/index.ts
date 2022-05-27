import express from 'express'
import cors from 'cors'
import { signupADM } from './endpoints/signupADM'
import { loginADM } from './endpoints/loginADM'
import { showPizzas } from './endpoints/showPizzas'
import { createOrder } from './endpoints/createOrder'
import { listOfOrders } from './endpoints/listOfOrders'
import { orderById } from './endpoints/orderById'
import { insertPizza } from './endpoints/insertPizza'
import { pizzaById } from './endpoints/pizzaById'
import { deleteOrder } from './endpoints/deleteOrder'
import { editOrder } from './endpoints/editOrder'


const app = express()
app.use(express.json())
app.use(cors())



app.post('/signup', signupADM)
app.post('/login', loginADM)
app.post('/orders', createOrder)
app.post('/pizzas', insertPizza)
app.put('/orders/:id', editOrder)
app.delete('/orders/:id', deleteOrder)
app.get('/orders', listOfOrders)
app.get('/orders/:id', orderById)
app.get('/pizzas', showPizzas)
app.get('/pizzas/:id', pizzaById)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server running at 3003')
})
