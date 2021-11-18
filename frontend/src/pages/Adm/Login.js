import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { url } from '../../constants/urls'
import axios from 'axios'

const Login = ()=>{
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email:'',
    password:''
  })


  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token){
      navigate('/adm')
    }
  }, [])


  const onChange = (e)=>{
    const { name, value } = e.target
    setForm({...form, [name]: value})
  }


  const login = (e)=>{
    e.preventDefault()
    const body = {
      email: form.email,
      password: form.password
    }
    axios.post(`${url}/login`, body).then(res=>{
      localStorage.setItem('token', res.data.access_token)
      navigate('/adm')
    }).catch(err=>{
      alert(err.response.data)
    })
  }

//=======================================Render=========================================
  return(
    <div>
      <form onSubmit={login}>
        <input type='email' name='email' value={form.email} onChange={onChange}
          placeholder='exemplo@email.com' required/>
        <input type='password' name='password' value={form.password} onChange={onChange}
          placeholder='Sua senha' required/>
        <button>Entrar</button>
      </form>
      <button onClick={()=> navigate('/')}>
        Voltar
      </button>
    </div>
  )
}
export default Login
