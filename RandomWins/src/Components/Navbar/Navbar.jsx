import React, { useEffect, useState } from 'react'
import './Navbar.css'
const Navbar = () => {

  useEffect(()=>{
    
  },[])
  const [address,setAddress]=useState(null);
  const onConnect=async ()=>{
    if (typeof window.ethereum !== 'undefined') {
        try {
            let addr= await window.ethereum.request({method:"eth_requestAccounts"});
            setAddress(addr[0]);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.error('MetaMask is not installed!');
    }
}
  return (
    <div className='navbar'>
        <h1><span>$</span>Random<span>Wins</span></h1>
        <div className="right">
          <li><a onClick={()=>onConnect()}> {address  ? address.substring(0,10)+"..." : "Connect Wallet" }</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Logout</a></li>
        </div>
    </div>
  )
}

export default Navbar