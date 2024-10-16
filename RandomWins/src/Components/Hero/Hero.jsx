import React, { useEffect, useState } from 'react'
import './Hero.css'
import {ethers} from 'ethers'
import Card from '../Card/Card'
import eth from "../../assets/eth.png"
import PreviousGames from '../PreviousGames/PreviousGames'
import { choices } from '../../assets/assets'
import Winner from '../Winner/Winner'



const Hero = () => {

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');

    
    ws.onmessage = (event) => {

        const data = JSON.parse(event.data);
  
        if (data.type === 'gamestate') {

          setGameActive(data.isGameActive);
          
          if(!data.isGameActive){
            setWinnerActive(true)
            setSelected("")
          }
          else{
            setLocked(false)
          }
          
        } 
        
        else if (data.type === 'time-left') {
          setTimeLeft(data.timeLeft);
        } 
        
      };


      ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };
  
      // Handle WebSocket error
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      // Cleanup WebSocket connection on component unmount
      return () => {
        ws.close();
      };

     
  },[])
  


  //To Interect with Deployed contract 
const provider=new ethers.providers.Web3Provider(window.ethereum);
const contractAddress="0x65Cad9685add8277BB86f081C39bda00a240f5c6";
const contractABI=[
    "function addBet(uint8 _id) payable external"
];
const signer=provider.getSigner();
const contract=ethers.Contract(contractAddress,contractABI,provider);
  const placeBet=async (num)=>{
    try{
      const amount=ethers.util.parseEther("0.01");
      const contractSign=contract.connect(signer);
      const tx=await contractSign.addBet(num,{value:amount});
      await tx.wait();
    }
    catch(e){
      console.error(e);
    }
    

 
  const handleChoiceLock = ()=>{

        if(!locked) setLocked(!locked)


  }

  const [selected,setSelected] = useState(null);
  const [locked,setLocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [winnerActive,setWinnerActive] = useState(true)

  return (
    <div className='hero'>

        <div className="topbar">
            <h3 >Luck decides, <span className='yellow'>Skill is on break.</span> </h3>
            <h3>{timeLeft?"Time Left : " : "Wait"}  
                <span className='yellow'>{timeLeft ? `0${Math.floor(timeLeft/60)} : ${Math.round(timeLeft%60)}`: "" }</span> 
            </h3>
        </div>

        
        <div className={gameActive&&!locked ? "options-card":"disable-div options-card"}>
            {
                choices.map(choice=>{
                    return(
                        <Card key={choice.id} choice = {choice} selected={selected} setSelected = {setSelected}  />
                    )
                })
            }
        </div>
        <div className="lock">
        
            <div className='ethamount'> <span >Bet Price : </span> <p style={{color:"var(--clr-secondary)"}}> &nbsp;  0.01 ETH</p><img src={eth} style={{width:"20px"}} /></div>
            <p>Game Id : <span className='yellow'>103</span> </p>
            <button style={{minWidth:"160px"}} className={locked || !gameActive ? 'locked' : 'button'} onClick={handleChoiceLock()}>{locked ? "Locked" : "Lock Choice"}</button>
        </div>
        <hr />
        <h2 id='title'> Previous<span className='yellow'> Games</span></h2>

        <PreviousGames/>

        {!gameActive && winnerActive  ?
            <Winner id={1} setWinnerActive={setWinnerActive}/> : ""
        }
        
    </div>
  )
}

export default Hero