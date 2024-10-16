import React, { useState } from 'react'
import { choices } from '../../assets/assets'
import './Winner.css' 

const Winner = ({id,setWinnerActive}) => {
  const [winner,setWinner] = useState(choices[id])

  return (
    <div className='winner'>
        <h1>Winner</h1>
        <img src={winner.image} alt="" />
        <h3>{winner.name}</h3>
        <p id='close' onClick={()=>setWinnerActive(false)}>X</p>
    </div>
  )
}

export default Winner