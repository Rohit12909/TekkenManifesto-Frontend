import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CharacterList from './Components/CharacterList';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <Navbar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/character-list" element={<CharacterList />} />
          </Routes>
        </div>
      </div>
    </Router>
    
  )
}

export default App
