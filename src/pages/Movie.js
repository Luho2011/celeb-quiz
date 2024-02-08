import React from 'react'
import "./Movie.css"
import {useState} from "react";
import list from "../movie.json"


function Movie() {
  const [words, setWords] = useState(list);
  const [remainingWords, setRemainingWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleStart = () => {
    const random = Math.floor(Math.random() * words.length);
    setRemainingWords(words[random].items);
    setCurrentIndex(0);
    remove(words[random].ids);
  };

  const remove = (id) => {
    const newList = words.filter(item => item.ids !== id);
    setWords(newList);
  }


  return (
    <div className='movie'>
      <div className='movie__buttons'>
          <button className='movie__button' onClick={handleStart}>start</button>
          <button className='movie__button' onClick={handleNext}>next</button>
      </div>
        <div className='movie__pics'>
        <div className="image-container">
          {remainingWords.map((item, index) => (
            <div className="image-wrapper">
              <img src={item.image} />
              {currentIndex >= 1 && <img src={item.image2} />}
              {currentIndex >= 2 && <img src={item.image3} />}
              {currentIndex >= 3 && <img src={item.image4} />}
            </div>
          ))}
        </div>
        </div>
          
    </div>
  )
}

export default Movie