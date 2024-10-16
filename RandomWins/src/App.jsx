import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import { useState } from 'react'

function App() {
  const [wallet,setWallet] = useState("#lkjljlsk99oi87987dfdsfdf")
  return (
    
    <>
      <Navbar wallet={wallet}/>
      <Hero/>
    </>
  )
}

export default App
