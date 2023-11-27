import React from 'react'
import './Content.css'
import { Link } from "react-router-dom";
import questionmark from "./img/question.png";
import rewindlogo from "./img/rewind.png";
import geo from "./img/geo.png";
import Lupe from "./img/Lupe.png";
import Sanduhr from "./img/sanduhr.png";


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
        <Link to='/geography' target="_blank">
          <button className='game_button'><img className='geo_logo' src={geo} alt="" onClick={""}/></button>
        </Link>
        <Link to='/zoom' target="_blank">
          <button className='game_button'><img className='lupe_logo' src={Lupe} alt="" onClick={""}/></button>
        </Link>
        <Link to='/history' target="_blank">
          <button className='game_button'><img className='sanduhr_logo' src={Sanduhr} alt="" onClick={""}/></button>
        </Link>
       </div>
    </div>
  )
}

export default Content