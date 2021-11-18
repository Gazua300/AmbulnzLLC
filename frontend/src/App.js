import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import Header from './components/Headers'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body{
    background-color: lightgray;
  }
`


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <Router/>
    </BrowserRouter>
  )
}

export default App;
