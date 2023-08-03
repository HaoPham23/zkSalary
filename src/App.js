import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import Prover from './components/pages/Prover'
import Verifier from './components/pages/Verifier'

import './App.css'
import BackgroundImage from './assets/images/bg.png'


export default function App() {
    return (
        <Router>
            <div style={AppStyle}>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/home" component={ HomePage } />
                    <Route path="/prove" component={ Prover}/>
                    <Route path="/verify" component={ Verifier}/>
                </Switch>
            </div>
        </Router>
    )
}

const AppStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}