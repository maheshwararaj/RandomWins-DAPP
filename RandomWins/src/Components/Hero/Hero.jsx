import React, { useEffect, useState } from 'react'
import './Hero.css'
import Card from '../Card/Card'
import eth from "../../assets/eth.png"
import PreviousGames from '../PreviousGames/PreviousGames'
import { choices } from '../../assets/assets'
import Winner from '../Winner/Winner'

// make the button unclickable after locking the choice
// make the choices unselectable after locking a choice


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
        
        else if (data.type === 'game-over') {
          setGameActive(false);
          
        //   setMessage(data.message);
        } else if (data.type === 'confirmation') {
        //   setMessage(`You selected: ${data.choice + 1}. ${data.message}`);
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
  
  useEffect(()=>{
    // if(localStorage.getItem("locked") != null){
    //   setLocked(localStorage.getItem("locked"));
    // }
    // else{
    //   localStorage.setItem("locked",false)
    // }
  },[])

  const handleChoiceLock = ()=>{
        
        if(!locked){
            setLocked(!locked)
            
        }
            
        
  }

  const [selected,setSelected] = useState("");
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
            <button style={{minWidth:"160px"}} className={locked || !gameActive ? 'locked' : 'button'} onClick={handleChoiceLock}>{locked ? "Locked" : "Lock Choice"}</button>
        </div>
        <hr />
        <h2 id='title'> Previous<span className='yellow'> Games</span></h2>
        <PreviousGames/>

        {!gameActive && winnerActive?
            <Winner id={1} setWinnerActive={setWinnerActive}/>
            :""

        }
        
    </div>
  )
}

export default Hero