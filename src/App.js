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
        <Route path='/' element={<HomeScreen />} />
        <Route path='/celeb' element={<Celeb />} />
        <Route path='/music' element={<Music />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
