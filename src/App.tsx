import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import Prover from './components/pages/Prover';
import Verifier from './components/pages/Verifier';

import './App.css';
import BackgroundImage from './assets/images/bg.png';

function App() {
  return (
    <BrowserRouter>
      <div style={AppStyle}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/prove" element={<Prover/>} />
          <Route path="/verify" element={<Verifier/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const AppStyle = {
  width: '100%',
  height: '100vh',
  background: `url(${BackgroundImage})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

export default App;

