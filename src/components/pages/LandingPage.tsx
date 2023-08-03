import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">zkSalary</h1>
      <p className="main-para text-center">reveal nothing</p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button" id="reg_btn">
            <span>log in </span>
          </button>
        </Link>
        <Link to="/prove">
          <button className="primary-button" id="reg_btn">
            <span>prove </span>
          </button>
        </Link>
        <Link to="/verify">
          <button className="primary-button" id="reg_btn">
            <span>verify </span>
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
