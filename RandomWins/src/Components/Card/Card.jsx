import React, { useEffect } from 'react'
import './Card.css'

const Card = ({choice,selected,setSelected}) => {

  const handleCardClick = () => {
    // Set the selected state to the clicked choice's name
    setSelected(choice.name);
  }

  useEffect(()=>{
    if(selected === choice.name){
      document.querySelector(".card").classList.add('selected')
    }
  },[])

  return (
    <div className={selected==choice.name ? "card selected" : "card"} onClick={handleCardClick}>
        <img src={choice.image} alt="" />
        <p>{choice.name}</p>
    </div>
  )
}

export default Card