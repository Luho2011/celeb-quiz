import React from 'react'
import themes from "../Theme.json";
import {useState} from "react";
import "./Theme.css";
import ReactAudioPlayer from 'react-audio-player';

function Theme() {
  const [song, setSong] = useState();
  const [songList, setSongList] = useState(themes);
  const [cover, setCover] = useState();
  const [showCover, setShowCover] = useState(true);

  const nextSong = () => {
    let random = Math.floor(Math.random() * songList.length);
    setSong(songList[random].intro);
    setCover(songList[random].cover);
    remove(songList[random].id);
    setShowCover(true);
    console.log(showCover)
  }


  const remove = (id) => {
    const newList = songList.filter(song => song.id !== id);
    setSongList(newList);
    console.log(newList);
  }
    
  return (
    <>
    <div className='theme'>
      <h1>Guess the Theme</h1>
      <div className='theme__content'>
          <button className='theme__button' onClick={nextSong}>next theme</button>
          <div className='songPlayer'>
            <ReactAudioPlayer
              src={song}
              controls
              />
          </div>
            <button className='theme__solution' onClick={()=> setShowCover(!showCover)}>solution</button>
      </div>
        
          <div className={showCover ? "cover__noShow" : "theme__cover"}>
                 <img src={cover} />
          </div> 
    </div>
    </> 
  )
}

export default Theme