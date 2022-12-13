import React, { useState, useEffect } from 'react'
import './Nav.css'
import logo from "./img/quizlogo.png";

function Nav() {
  

  return (
    <div className='nav'>
        <div className='nav_contents'>
            <img
            className='nav_logo'
            src={logo} alt=""
             />
             <div className='des'>
             </div>
             
             
             
        </div>
    </div>
  )
}

export default Nav