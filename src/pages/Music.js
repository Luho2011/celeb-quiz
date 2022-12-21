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

  const reverseIt = () => {
    let random = Math.floor(Math.random() * songs.length);
    setSong(songList[random].song);
  }

  return (
    <>
    <div className='songpage'>
      <h1>guess the music</h1>
      <div className='song_buttons'>
        <button className='reverse_button' onClick={reverseIt}>reverse</button>
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