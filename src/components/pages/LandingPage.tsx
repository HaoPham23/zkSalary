import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">zkSalary</h1>
      <p className="main-para text-center">Your Salary, Your Privacy!</p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button" id="reg_btn">
            <span>Employer's App</span>
          </button>
        </Link>
        <Link to="/prove">
          <button className="primary-button" id="reg_btn">
            <span>Employee's App</span>
          </button>
        </Link>
        <Link to="/verify">
          <button className="primary-button" id="reg_btn">
            <span>Verifier's App</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

const HeaderStyle = {
  width: '100%',
  height: '100vh',
};

export default LandingPage;
