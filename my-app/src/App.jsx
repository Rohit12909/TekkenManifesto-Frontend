import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserProvider from './Components/UserContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CharacterList from './Components/CharacterList';
import Character from './Components/Character';
import './App.css'

function App() {

  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/character-list" element={<CharacterList />} />
              <Route path="/character/:name" element={<Character />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
    
  )
}

export default App
