import Login from '../Login/Login'
import Register from '../Register/Register'
import App from '../app/App'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import './home.css'


function Home() {

  return (

      <header className='home-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/App' element={<App/>}></Route>
          </Routes>
        </BrowserRouter>
      </header>
  )
}

export default Home

