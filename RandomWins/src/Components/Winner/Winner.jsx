import React, { useState } from 'react'
import { choices } from '../../assets/assets'
import './Winner.css' 


const Winner = ({result,selected,setWinnerActive}) => {
  const [winner,setWinner] = useState(choices[result-1])

  return (
    <div className='winner'>
        <h1>Winner</h1>
        <img src={winner.image} alt="" />
        <h3>{winner.name}</h3>
        <p>{selected==result ? "You WON" : "You LOSE"}</p>
        <p id='close' onClick={()=>setWinnerActive(false)}>X</p>
    </div>
  )
}

export default Winner
