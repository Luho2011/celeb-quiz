import React from 'react'
import "./Movie2.css"
import {useState} from "react";
import Movies2 from "../movies2.json"
import { Link } from "react-router-dom";
import Counter from "../Counter";


function Movie2() {

  const [movies] = useState(Movies2);

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('clicked');
  };

  const isDifficult = (box) => {
    return box.items.some((item) => item.difficulty === '2');
  };
 
  return (
    <div className='movie2'>
      <div className='movie2__counter'>
       <Counter/>
      </div>
        <div className='movies2__all'>
          {movies.map((box) => (
            <Link to={`/${box.ids}`} target="_blank">
              <button className={`movie2Btns ${isDifficult(box) ? "movie2Btns__difficult" : ""}`} key={box.ids} 
              onClick={handleButtonClick}
              >
                <p>{box.ids}</p>
              </button> 
            </Link>
         ))}
        </div> 
    </div>
  )
}

export default Movie2
