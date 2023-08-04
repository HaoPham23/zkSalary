import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../App.css';

const HomePage: React.FC = () => {
  // const [formEmployer, setFormEmployer] = useState({
  //   name: '',
  //   identifier: '',
  //   salary: '',
  //   });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormEmployer((prevData) => ({
  //   ...prevData,
  //   [name]: value,
  //   }));
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formEmployer);
  //   // const { identifier, lower, upper, proof, publicSignals} = formVerify;
  //   const {name, identifier, salary} = formEmployer;
  // } Move to AddPage or sth
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
