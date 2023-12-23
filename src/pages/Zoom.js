import React from 'react'
import {useState, useEffect} from "react";
import "./Zoom.css";



function Zoom() {




  return (
    <div className='zoom'>
      <img className='zoom_pic' src={process.env.PUBLIC_URL + '/img/pics/1.jpg'} />
    </div>
  )
}

export default Zoom