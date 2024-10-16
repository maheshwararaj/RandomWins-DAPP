import React, { useEffect } from 'react'
import './Card.css'

const Card = ({choice,selected,setSelected}) => {

  
  useEffect(()=>{
    if(selected === choice.name){
      document.querySelector(".card").classList.add('selected')
    }
  },[])

  return (
    <div className={selected === choice.name ? "card selected" : "card"} onClick={()=>setSelected(choice.name)}>
        <img src={choice.image} alt="" />
        <p>{choice.name}</p>
    </div>
  )
}

export default Card