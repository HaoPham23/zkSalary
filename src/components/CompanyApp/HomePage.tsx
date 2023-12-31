import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="main-title">Welcome</h1>
      <div className="buttons text-center">
        <Link to="add">
          <button className="primary-button" id="reg_btn">
            <span>Upload payrolls</span>
          </button>
        </Link>
      </div>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>
    </div>
  );
};

export default HomePage;
