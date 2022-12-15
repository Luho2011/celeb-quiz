import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Celeb from './pages/Celeb';
import Music from './pages/Music';
import Nav from './Nav';
import { Route, Routes } from "react-router-dom"; 

function App() {
  return (
    <>
    <div className="app">
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
        <Route path='/celeb-quiz/celeb' element={<Celeb />} />
        <Route path='/celeb-quiz/music' element={<Music />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
