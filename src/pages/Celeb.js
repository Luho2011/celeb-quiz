import React from 'react'
import {useState, useEffect} from "react";
import "./Celeb.css"
import images from "../Index.json"


function Celeb() {
  const [image, setImage] = useState();
  const [imageList, setImageList] = useState(images);
  
  /*
  const handleNext = () => {
    fetch('https://randomfox.ca/floof/')
    .then(res => res.json())
    .then(data => 
      setImage(data.image))
      const unblurit = document.querySelector(".pic img");
      unblurit.classList.remove("unblur");
      unblurit.classList.add("blur");
    }*/

    const handleNext = () => {
      let random = Math.floor(Math.random() * images.length);
      setImage(imageList[random].image);
      const unblurit = document.querySelector(".pic img");
      unblurit.classList.remove("unblur");
      unblurit.classList.add("blur");
      remove(imageList[random].id);
      
    }

    const remove = (id) => {
      const newList = imageList.filter(image => image.id !== id);
      setImageList(newList);
      console.log(newList);
    }
    

  const handleStart = () => {
    const blurit = document.querySelector(".pic img");
    blurit.classList.toggle("unblur");
  }

  

  return (
    <div className='celeb'>
      <div className='celeb_buttons'>
        <button className='play_button' onClick={handleNext}>Next</button>
        <button className='play_button' onClick={handleStart}>Start</button>
      </div>
      <div className='pic'>
        <img src={image} />
        {/*
        <img src={image}></img>
 {
        images.map((item) =>
        <div key={item.id}>
          <img src={item.image}/>
          </div>
        )
      }
    */ }
       
      </div>
    </div>
  )
}

export default Celeb