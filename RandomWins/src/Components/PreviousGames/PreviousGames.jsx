import React from 'react'
import './PreviousGames.css'
import { previousGames } from '../../assets/assets'
import { choices } from '../../assets/assets'
const PreviousGames = () => {
  return (
    <div className="previousgames" style={{position:"sticky"}}>
       
        <div className="list-table-format header">
            <p>ID</p>
            <p>winner</p>
            <p>Profit</p>
            <p>monkey</p>
            <p>giraffe</p>
            <p>dog</p>
            <p>cat</p>
        </div>
        <div className='gamelist'>
        {
          previousGames.map(game=>{
            return(
              <div className="list-table-format" key={game.id}>
                <p>{game.id}</p>
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={choices[game.winner-1].image} style={{width:"40px",height:"40px",borderRadius:"4px"}} alt="" />{choices[game.winner-1].name}</div>
                <p>{game.profit}%</p>
                <p>{game.bets[0]}</p>
                <p>{game.bets[1]}</p>
                <p>{game.bets[2]}</p>
                <p>{game.bets[3]}</p>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default PreviousGames