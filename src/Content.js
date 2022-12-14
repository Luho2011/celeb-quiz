import React from 'react'
import './Content.css'
import { Link } from "react-router-dom";
import questionmark from "./img/question.png";
import rewindlogo from "./img/rewind.png";


function Content() {
  return (
    <div className='content'>
       <div className='game_buttons'>
        <Link to='/celeb' target="_blank">
          <button className='game_button'><img className='questionmark_logo' src={questionmark} alt="" onClick={""}/></button>
        </Link>
        <Link to='/music' target="_blank">
          <button className='game_button'><img className='rewind_logo' src={rewindlogo} alt="" onClick={""}/></button>
        </Link>
       </div>
    </div>
  )
}

export default Content