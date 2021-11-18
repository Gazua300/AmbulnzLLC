import { Routes, Route } from 'react-router-dom'
import GlobalState from '../global/GlobalState'
import Home from '../pages/Home/Home'
import Details from '../pages/Details/Details'



const Router = ()=>{
  return(
    <GlobalState>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/details' element={<Details/>}/>
      </Routes>
    </GlobalState>
  )
}
export default Router
