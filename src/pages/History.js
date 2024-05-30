import React from 'react'
import {useState} from "react";
import "./History.css"
import images from "../History.json"


function History() {
  const [show, setShow] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState(null);
  const [distance, setDistance] = useState();
  const [population, setPopulation] = useState();
  const [flag, setFlag] = useState();
  const [neighbour, setNeighbour] = useState();
  const [solution, setSolution] = useState(false);
  const [imageList, setImageList] = useState(images);

  

  const handleNext = () => {
    if (imageList.length > 0) {
      let random = Math.floor(Math.random() * imageList.length);
      setVideo(imageList[random].image);
      setName(imageList[random].name);
      setPopulation(imageList[random].population);
      setDistance(imageList[random].Entfernung);
      setFlag(imageList[random].flagge);
      setNeighbour(imageList[random].währung);
      remove(imageList[random].id);
      setSolution(true);
      setShow(true)
      setHintIndex(0);
    }
  };

  const remove = (id) => {
    const newList = imageList.filter(image => image.id !== id);
    setImageList(newList);
    console.log(newList);
  };

  const handleNextHint = () => {
    setHintIndex(prevIndex => prevIndex + 1);
  };
      

  return (
    <div className='history'>
      <div className='headline__history'>
        <h2>Guess the Country</h2>
      </div>
      <div className='history_buttons'>
        <button className='play_button' onClick={handleNext}>Next</button>
        <button className='play_button' onClick={()=> setSolution(!solution)}>Solution</button>
        <button className='play_button' onClick={handleNextHint}>hint</button>
      </div>

      <div className='history__quiz'>
        <div className='pic__history'>
            {video && (
              <video key={video} width="1200" controls>
              <source src={video} type="video/mp4" />
            </video>
              )}  
            <h1 className={solution ? "solution" : ""}>{name}</h1>
        </div>
              <div className={show ? "history__hints" : "show"}>
                  <div className="history__hintBox">
                      {hintIndex >= 1 && <h1>{distance}</h1>}
                  </div>
                  <div className="history__hintBox">
                     {hintIndex >= 2 && <h1>{population}</h1>}
                  </div>
                  <div className="history__hintBox">
                     {hintIndex >= 3 && <h1>{neighbour}</h1>}
                  </div>                 
                    {hintIndex >= 4 && <img src={flag}/>}

              </div>

      </div>
  
    </div>
  )
}

export default History;