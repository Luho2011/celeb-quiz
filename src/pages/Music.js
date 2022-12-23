import React from 'react'
import songs from "../Songs.json";
import {useState} from "react";
import "./Music.css";
import ReactAudioPlayer from 'react-audio-player';

function Music() {
  const [song, setSong] = useState();
  const [songList, setSongList] = useState(songs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const nextSong = () => {
    let random = Math.floor(Math.random() * songs.length);
    setSong(songList[random].song);
  }

  const slower = () => {
    const rewind = document.querySelector(".songPlayer audio");
    rewind.playbackRate = 0.5;
  }
 
 
  return (
    <>
    <div className='songpage'>
      <h1>guess the music</h1>
      <div className='song_buttons'>
        <button className='reverse_button' onClick={nextSong}>next song</button>
        <button className='reverse_button' onClick={slower}>slower</button>
      </div>
      <div className='songPlayer'>
        <ReactAudioPlayer
          src={song}
          controls
          />
      </div>
    </div>
    </> 
  )
}

export default Music