import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../App.css';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="main-title">Welcome</h1>
      <div className="buttons text-center">
        <Link to="add">
          <button className="primary-button" id="reg_btn">
            <span>add </span>
          </button>
        </Link>
        <Link to="remove">
          <button className="primary-button" id="reg_btn">
            <span>remove </span>
          </button>
        </Link>
        <Link to="view">
          <button className="primary-button" id="reg_btn">
            <span>view </span>
          </button>
        </Link>
      </div>
      <Link to="/">
        <button className="primary-button">Log out</button>
      </Link>
    </div>
  );
};

export default HomePage;
