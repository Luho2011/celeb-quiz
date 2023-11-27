import React from 'react'
import {useState} from "react";
import "./History.css"
import images from "../History.json"


function History() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [solution, setSolution] = useState(false);
  const [imageList, setImageList] = useState(images);
  

    const handleNext = () => {
      let random = Math.floor(Math.random() * imageList.length);
      setImage(imageList[random].image);
      // setName(imageList)
      setName(imageList[random].name);
      remove(imageList[random].id);
      setSolution(true)
    }

    const remove = (id) => {
      const newList = imageList.filter(image => image.id !== id);
      setImageList(newList);
      console.log(newList);
    }
      

  return (
    <div className='history'>
      <div className='history_buttons'>
        <button className='play_button' onClick={handleNext}>Next</button>
        <button className='play_button' onClick={()=> setSolution(!solution)}>Solution</button>
      </div>
      <div className='pic'>
        <img className="history__pic" src={image} />
       <h1 className={solution ? "solution" : ""}>{name}</h1>
      </div>
    </div>
  )
}

export default History;