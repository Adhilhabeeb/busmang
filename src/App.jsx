import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mainu from './Mainn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './Contact'

import { Header } from './Header'
import { Footer } from './Footer'
import Token from './Token'
import Register from './Register'
import { Login } from '@mui/icons-material'
import Loginpage from './Login'
import { About } from './About'
import Tokenshow from './Tokenshow'
export const ourcontext = createContext();


function App() {
  const [count, setCount] = useState(0)
  const [user, setuser] = useState(false)


  useEffect(() => {
  if (user) {
    localStorage.setItem("auth",JSON.stringify(user))
  }
  }, [user])

  useEffect(() => {
   
let auth=JSON.parse(localStorage.getItem("auth"))

if (auth) {
 setuser(auth)
}
  }, [])
  
  
  return (
    <ourcontext.Provider value={{user,setuser}}>

    <BrowserRouter>
<Header/>
<Routes>

    <Route path="/" element={<Mainu/>} />
    <Route path="Contact" element={<Contact/>} />
    <Route path="About" element={<About/>} />
    <Route path="BookTicket" element={<Token/>} />
    <Route path="Signup" element={<Register/>} />
    <Route path="Signin" element={<Loginpage/>} />
    <Route path="tokenshow" element={<Tokenshow/>} />





    
  

    
  
  </Routes>
<Footer/>

    </BrowserRouter>
    </ourcontext.Provider>


  )
}

export default App
