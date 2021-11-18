import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import {
  Container,
  Card,
  Title,
  Photo,
  BtnContainer
} from './styled'



//==============================Component====================================
const Details = ()=>{
  const { states } = useContext(Context)
  const detail = states.detail
  const navigate = useNavigate()
  const [qnt, setQnt] = useState('')


  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token){
      navigate('/adm')
    }
  }, [])


  const handleQnt = (e)=>{
    setQnt(e.target.value)
  }


  const order = ()=>{
    const body = {
      pizza: detail.name,
      quantity: qnt
    }

    const decide = window.confirm(`
      Pizza: ${detail.name}
      Preço: ${detail.price}
      Quantidade: ${qnt}
      Total: ${qnt * detail.price}
    `)

    if(decide){
      axios.post(`${url}/orders`, body).then(res=>{
        alert(res.data)
      }).catch(err=>{
        alert(err.response.data)
      })
    }

  }

//================================Render================================
  return(
        <Container>
          <Card key={detail.id}>
            <Title>{detail.name}</Title>
            <Photo src={detail.photo} alt=''/><p>
            Valor: R$ {detail.price}.00<br/>
            Quantidade:&nbsp;
            <input type='number' min='0'
              value={qnt} onChange={handleQnt}/>
            <BtnContainer>
              <button onClick={()=> navigate('/')}>Voltar</button>
              <button onClick={order}>
                Confirmar Pedido
              </button>
            </BtnContainer>
            </p>
          </Card>
        </Container>
  )
}
export default Details
