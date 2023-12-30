import React from 'react'
import songs from "../Songs.json";
import songs2 from "../Songs2.json";
import {useState} from "react";
import "./Music.css";
import ReactAudioPlayer from 'react-audio-player';

function Music() {
  const [song, setSong] = useState();
  const [songO, setSongO] = useState();
  const [songList, setSongList] = useState(songs2);
  const [songName, setSongName] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [titleSolution, setTitleSolution] = useState(false);

  const nextSong = () => {
    let random = Math.floor(Math.random() * songList.length);
    setSong(songList[random].song);
    setSongO(songList[random].songO);
    setSongName(songList[random].songName);
    remove(songList[random].id);
    setTitleSolution(true);
  }


  const remove = (id) => {
    const newList = songList.filter(song => song.id !== id);
    setSongList(newList);
    console.log(newList);
  }
 
 
  return (
    <>
    <div className='songpage'>
      <h1>Guess the Song</h1>
      <div className='song_buttons'>
        <button className='reverse_button' onClick={nextSong}>next song</button>
      </div>
      <div className='songPlayer'>
        <h2>Reversed</h2>
        <ReactAudioPlayer
          src={song}
          controls
          />
      </div>
      <div className='songPlayer'>
        <h2>Solution</h2>
        <button onClick={()=> setTitleSolution(!titleSolution)}>Title</button>
        <ReactAudioPlayer
          src={songO}
          controls
          />
          <h1 className={titleSolution ? "title" : ""}>{songName}</h1>
      </div>
    </div>
    </> 
  )
}

export default Music