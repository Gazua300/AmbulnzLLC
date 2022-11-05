import { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from '../../constants/urls'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
  button{
    float: right;
    margin-top: -40px;
    border-radius: 10px;
    background-color: goldenrod;
    cursor: pointer
  }
  h3{
    color: goldenrod;
    text-shadow: 3px 3px 6px goldenrod;
  }
`
const Card = styled.div`
  padding: 10px;
  box-shadow: 3px 3px 6px black;
  margin: 10px;
`
const Msg = styled.div`
  text-align: center;
  font-size: 1.5rem;
`


//============================================Component================================
const Adm = ()=>{
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [orders, setOrders] = useState([])

  console.log(orders)


  useEffect(()=>{
    if(!token){
      navigate('/')
    }
    listOfOrders()
  }, [])


  const logout = ()=>{
    const decide = window.confirm('Tem certeza que deseja sair da área de Adm?')

    if(decide){
      localStorage.removeItem('token')
      navigate('/')
    }
  }

  const listOfOrders = ()=>{
    const headers = {
      headers: {
        Authorization: token
      }
    }
    axios.get(`${url}/orders`, headers).then(res=>{
      setOrders(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }

//=======================================Render==================================
  return(
    <Container>
      <h3>Histórico de Pedidos</h3>
      <button onClick={logout}>
        Deslogar
      </button>
      <div>
        {orders.length !== 0 ? orders.map(order=>{          
          return(
            <Card key={order.id}>
              <b>Sabor: </b>{order.pizza}<br/>
              <b>Preço: </b>{order.price}<br/>
              <b>Quantidade: </b>{order.quantity}<br/>
              <b>Total: </b>{order.total}<br/>
              <b>Data: </b>{order.date}
            </Card>
          )
        }) : <Msg>Nenhum pedido feito ainda</Msg>}
      </div>
    </Container>
  )
}
export default Adm
