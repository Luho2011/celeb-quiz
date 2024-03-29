import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Celeb from './pages/Celeb';
import Music from './pages/Music';
import Belong from './pages/Belong';
import Zoom from './pages/Zoom';
import Movie from './pages/Movie';
import Nav from './Nav';
import History from './pages/History';
import { Route, Routes } from "react-router-dom"; 
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"

function App() {
  return (
    
        <div className="app">
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/celeb' element={<Celeb />} />
            <Route path='/music' element={<Music />} />
            <Route path='/belong' element={<Belong />} />
            <Route path='/zoom' element={<Zoom />} />
            <Route path='/history' element={<History />} />
            <Route path='/movies' element={<Movie />} />
          </Routes>
        </div>
       
   
  );
}

export default App;
