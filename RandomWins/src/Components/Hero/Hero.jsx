import React, { useEffect, useState } from 'react'
import './Hero.css'
import {ethers} from 'ethers'
import Card from '../Card/Card'
import eth from "../../assets/eth.png"
import PreviousGames from '../PreviousGames/PreviousGames'
import { choices } from '../../assets/assets'
import Winner from '../Winner/Winner'
import placeBet from '../../Contracts/placeBet'

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
            setLocked("false")
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
  


 
  const handleChoiceLock = ()=>{

        if(locked=="false"){
          setLocked("true")
          placeBet(selected)
        } 


  }

  const [selected,setSelected] = useState(null);
  const [locked,setLocked] = useState("false");
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

        
        <div className={locked=="false" && gameActive  ? "options-card":"disable-div options-card"}>
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
            <button style={{minWidth:"160px"}} className={ locked == "true" ||  !gameActive ? 'locked' : 'button'} onClick={()=>handleChoiceLock()}>{locked=="true" ? "Locked" : "Lock Choice"}</button>
        </div>
        <hr />
        <h2 id='title'> Previous<span className='yellow'> Games</span></h2>

        <PreviousGames />

        {!gameActive && winnerActive  ?
            <Winner id={1} setWinnerActive={setWinnerActive}/> : ""
        }
        
    </div>
  )
}

export default Hero