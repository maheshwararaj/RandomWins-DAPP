import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers';
import './Navbar.css'
const Navbar = () => {

  useEffect(()=>{
    
  },[])
  const [address,setAddress]=useState(null);
  const onConnect=async ()=>{
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({method:"eth_requestAccounts"});
            const signer=provider.getSigner();
            setAddress(signer.getAddress());
            const message = "Sign this message to verify your account";
            const signature = await signer.signMessage(message);
            // addr.textContent= await address;
            // let bal=await provider.getBalance(address)
            // console.log(ethers.utils.formatEther(bal));
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
          <li><a honClick={()=>onConnect()}> {address  ? address.substring(0,10)+"..." : "Connect Wallet" }</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Logout</a></li>
        </div>
    </div>
  )
}

export default Navbar