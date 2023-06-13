import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Celeb from './pages/Celeb';
import Music from './pages/Music';
import Geography from './pages/Geography';
import Nav from './Nav';
import { Route, Routes } from "react-router-dom"; 

function App() {
  return (
    <>
    <div className="app">
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
        <Route path='/celeb' element={<Celeb />} />
        <Route path='/music' element={<Music />} />
        <Route path='/geography' element={<Geography />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
