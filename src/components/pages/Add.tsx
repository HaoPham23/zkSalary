import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

const Add: React.FC = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formEmployer, setFormEmployer] = useState({
    name: '',
    identifier: '',
    salary: '',
    });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormEmployer((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formEmployer);
    // const { identifier, lower, upper, proof, publicSignals} = formVerify;
    // send form to server
  }
  return (
    <div className="text-center">
      <h2 className="main-title">Add</h2>
      <form action="/home" method="post" onSubmit={handleSubmit}>
        <p>
          <label>Name</label>
          <br />
          <input type="text" name="proof" value={formEmployer.name} onChange={handleChange} required />
        </p>
        <p>
          <label>Identifier</label>
          <br />
          <input type="text" name="publicSignals" value={formEmployer.identifier} onChange={handleChange} required />
        </p>
        <p>
          <label>Salary</label>
          <br />
          <input type="text" name="publicSignals" value={formEmployer.salary} onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Verify</button>
        </p>
      </form>

      <footer>
        <div onClick={() => navigate(-1)}><p>Back to Homepage.</p></div>
      </footer>
    </div>
  );
};

export default Add;
