import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import Celeb from './pages/Celeb';
import Music from './pages/Music';
import Geography from './pages/Geography';
import Zoom from './pages/Zoom';
import Nav from './Nav';
import History from './pages/History';
import { Route, Routes } from "react-router-dom"; 
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
        <>
        <div className="app">
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/celeb' element={<Celeb />} />
            <Route path='/music' element={<Music />} />
            <Route path='/geography' element={<Geography />} />
            <Route path='/zoom' element={<Zoom />} />
            <Route path='/history' element={<History />} />
          </Routes>
        </div>
        </>
    </DndProvider>
   
  );
}

export default App;
