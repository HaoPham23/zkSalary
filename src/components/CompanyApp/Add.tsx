import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';
import SingleFileUpload from './Upload';

const Add: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2 className="main-title">Upload payrolls</h2>
      <br/>
      <div style={{color: "white"}}>
      <SingleFileUpload/>
      </div>
      
      <br/>
      <button className="primary-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Add;
