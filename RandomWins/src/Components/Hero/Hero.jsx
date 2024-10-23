import { useEffect, useState } from 'react'
import './Hero.css'
import Card from '../Card/Card'
import eth from "../../assets/eth.png"
import PreviousGames from '../PreviousGames/PreviousGames'
import { choices } from '../../assets/assets'
import Winner from '../Winner/Winner'
import placeBet from '../../Contracts/placeBet'

const Hero = () => {
  let ws;
  useEffect(() => {
    ws = new WebSocket('ws://localhost:8090');
    
    //if user already locked a choice
    if (JSON.parse(localStorage.getItem("choice")) != null) {
      setSelected(JSON.parse(localStorage.getItem("choice")));
      setLocked(true)
    }

    
    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data.type === 'timeLeft') {
        setTimeLeft(data.timeLeft);
      }

      // getting the state for the first time
      else if(data.type === 'gameState' && data.isGameActive && selected == null )
        setGameActive(true)
      /* resetting all the states */
      else if(data.type === 'gameStart'){
        setSelected(null)
        setGameActive(true)
        setLocked(false)
        setWinnerActive(false)
        localStorage.setItem("choice",null)
      }
      else if(data.type === 'gameEnd'){
        setGameActive(false)
        setLocked(true)
      }
      else if(data.type === 'result'){
        setResult(data.lucky)
        setGameActive(false)
        setWinnerActive(true)
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


  }, [])




  const handleChoiceLock = () => {
    if (!locked && selected )  {
      localStorage.setItem("choice",JSON.parse(selected))
      document.getElementById('message').innerText = ""
      setLocked(true)
      placeBet(selected)
    }
    else document.getElementById('message').innerText = "Select a choice first"
  }

  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [winnerActive, setWinnerActive] = useState(false)
  const [result,setResult] = useState(null)


  return (
    <div className='hero'>
      <div className="topbar">
        <h3 >Luck decides, <span className='yellow'>Skill is on break.</span> </h3>
        <p id='message'></p>
        <h3>{timeLeft ? "Time Left : " : "Wait"}
          <span className='yellow'>{timeLeft ? `0${Math.floor(timeLeft / 60)} : ${Math.round(timeLeft % 60)}` : ""}</span>
        </h3>
      </div>


      <div className={locked == false && gameActive ? "options-card" : "disable-div options-card"}>
        {
          choices.map(choice => {
            return (
              <Card key={choice.id} choice={choice} selected={selected} setSelected={setSelected} />
            )
          })
        }
      </div>
      <div className="lock">

        <div className='ethamount'> <span >Bet Price : </span> <p style={{ color: "var(--clr-secondary)" }}> &nbsp;  0.01 ETH</p><img src={eth} style={{ width: "20px" }} /></div>
        <p>Game Id : <span className='yellow'>103</span> </p>
        <button style={{ minWidth: "160px" }} className={locked == true || !gameActive ? 'locked' : 'button'} onClick={() => handleChoiceLock()}>{locked == "true" ? "Locked" : "Lock Choice"}</button>
      </div>
      <hr />
      <h2 id='title'> Previous<span className='yellow'> Games</span></h2>

      <PreviousGames />

      {!gameActive && winnerActive ?
        <Winner result={result} selected={selected} setWinnerActive={setWinnerActive} /> : ""
      }

    </div>
  )
}

export default Hero
