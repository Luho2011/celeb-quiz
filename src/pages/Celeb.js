import React from 'react'
import {useState, useEffect} from "react";
import "./Celeb.css"
import images from "../Index.json"


function Celeb() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [unblur, setUnblur] = useState(true);
  const [unblurSolution, setUnblurSolution] = useState(false);
  const [imageList, setImageList] = useState(images);
  
  

    const handleNext = () => {
      let random = Math.floor(Math.random() * imageList.length);
      setImage(imageList[random].image);
      // setName(imageList)
      setName(imageList[random].name);
      remove(imageList[random].id);
      setUnblurSolution(true);
    }

    const remove = (id) => {
      const newList = imageList.filter(image => image.id !== id);
      setImageList(newList);
      console.log(newList);
    }
    
  

  return (
    <div className='celeb'>
      <div className='celeb_buttons'>
        <button className='play_button' onClick={handleNext}>Next</button>
        <button className='play_button' onClick={()=> setUnblur(!unblur)}>Start</button>
        <button className='play_button' onClick={()=> setUnblurSolution(!unblurSolution)}>Solution</button>
      </div>
      <div className='pic'>
        <img className={`${unblur ? "blur" : "unblur"} ${unblurSolution ? "" : "unblurFast"}`} src={image} />
       <h1 className={unblurSolution ? "solution" : ""}>{name}</h1>
      </div>
    </div>
  )
}

export default Celeb