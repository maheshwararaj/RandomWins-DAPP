import React, { useEffect } from 'react'
import './Navbar.css'
const Navbar = (props) => {
  console.log(props.wallet)
  useEffect(()=>{
    
  },[])
  
  return (
    <div className='navbar'>
        <h1><span>$</span>Random<span>Wins</span></h1>
        <div className="right">
          <li><a href=""> {props.wallet  ? props.wallet.substring(0,10)+"..." : "Connect Wallet" }</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Logout</a></li>
        </div>
    </div>
  )
}

export default Navbar