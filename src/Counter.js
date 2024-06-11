import React from 'react'
import {useState} from "react";
import "./Counter.css"

function Counter() {

    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");

    const handleChange = (event) => {
        setNewPlayer(event.target.value);
    }

    const addPlayer = () => {
        if (newPlayer.trim() !== "") {
            setPlayers(prev => [...prev, { name: newPlayer, score: 0 }]);
            setNewPlayer("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addPlayer();
        }
    }

    const increaseScore = (index) => {
        const updatedPlayers = players.map((player, i) => 
            i === index ? { ...player, score: player.score + 1 } : player
        );
        setPlayers(updatedPlayers);
    }

    const decreaseScore = (index) => {
        const updatedPlayers = players.map((player, i) => 
            i === index ? { ...player, score: player.score - 1 } : player
        );
        setPlayers(updatedPlayers);
    }


  return (
    <div className='counter'>
        <input
            className='counterInput'
            type='text'
            placeholder='Enter Player'
            value={newPlayer}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            />
          <button onClick={addPlayer}>Add</button>  
        <div className='playersBox'>
            <div>
                {players.map((player, index) => 
                    <div className='playersCount' key={index}>
                        <span className='text'>{`${player.name} :`}</span>
                        <div className='counter__score'>
                            <h3>{player.score}</h3>
                        </div>
                            <div className='counter__buttons'>
                                <button className='increaseCounter' onClick={() => increaseScore(index)}>+</button>
                                <button className='decreaseCounter' onClick={() => decreaseScore(index)}>-</button>
                            </div>
                    </div>
                )}
            </div>
        </div>
          

    </div>
  )
}

export default Counter