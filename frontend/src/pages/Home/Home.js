import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Title, Photo } from './styled'
import { useContext } from 'react'
import Context from '../../global/Context'



const Home = ()=>{
  const { states, requests } = useContext(Context)
  const pizzas = states.pizzas


  return(
    <div>
      {pizzas && pizzas.map(pizza=>{
        return<Card key={pizza.id}>
                <Title>{pizza.name}</Title>
                <Photo src={pizza.photo} alt=''
                 onClick={()=> requests.pizzaDetail(pizza.id)}/>
              </Card>
      })}
    </div>
  )
}

export default Home
