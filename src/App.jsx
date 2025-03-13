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
import { createTheme, ThemeProvider } from '@mui/material'
import Addpass from './Addpass'
import Showconcessiongranted from './Showconcessiongranted'
export const ourcontext = createContext();


function App() {
  const [admins, setadmins] = useState(["adhilhabeeb960571@gmail.com","basilke00@gmail.com"])
  const [count, setCount] = useState(0)
  const [user, setuser] = useState(false)
const [admin, setadmin] = useState(false)
  useEffect(() => {
    
if (user  && admins.includes(user.email)) {

setadmin(true)
}


  }, [user])
  
  let theme=createTheme({

    palette:{
     
    othercolor:{
      bfclr: "#deceaa",
      main:"#757471",
      fontfamiily:[ 'Indie Flower', 'cursive'].join(","),
      gemfamily:['Grechen Fuemen','sans-serif'].join(","),
      maincolor:"#ebe9d8",
       black:"rgb(34, 33, 21)",
       shadfont: ['Shadows Into Light','sans-serif'].join(","),
       btnwhite:"rgb(255,255,255)"
     
    }
    
    }
  })
  useEffect(() => {
  if (user) {
    localStorage.setItem("auth",JSON.stringify(user))
  }else{
    setadmin(false)
  }
  }, [user])

  useEffect(() => {
   
let auth=JSON.parse(localStorage.getItem("auth"))

if (auth) {
 setuser(auth)
}
  }, [])
  
  
  return (
    <ourcontext.Provider value={{user,setuser,admin}}>
<ThemeProvider theme={theme}>
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
    <Route path="addpass" element={<Addpass/>} />
    <Route path="showconsession" element={<Showconcessiongranted/>} />


    



    
  

    
  
  </Routes>
<Footer/>

    </BrowserRouter>

</ThemeProvider>
 
    </ourcontext.Provider>


  )
}

export default App
