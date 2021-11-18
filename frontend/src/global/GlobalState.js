import Context from './Context'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from '../constants/urls'



const GlobalState = (props)=>{
  const [pizzas, setPizzas] = useState([])
  const [detail, setDetail] = useState({})

  useEffect(()=>{

    axios.get(`${url}/pizzas`).then(res=>{
      setPizzas(res.data)
    }).catch(err=>{
      alert(err.response)
    })

  }, [])


  const pizzaDetail = (id)=>{
    axios.get(`${url}/pizzas/${id}`).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      alert(err.response.data.message)
    })
  }

  const states = { pizzas }
  const setters = {}
  const requests = { pizzaDetail }

  return<Context.Provider value={{ states, setters, requests }}>
          {props.children}
        </Context.Provider>

}

export default GlobalState
