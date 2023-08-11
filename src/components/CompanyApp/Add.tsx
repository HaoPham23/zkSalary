import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

const Add: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>('');
  const [formEmployer, setFormEmployer] = useState({
    fullName: '',
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
    fetch('http://localhost:8000/add', {
            method: 'POST',
            body: JSON.stringify(formEmployer),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then((response) => response.json())
        .then((res) => {
            if (!res.error) {
              setMsg('Added!');
            } else {
              setMsg(res.error);
            }
        })
        .catch((err) => {
          setMsg('Failed to connect to server');
        });
    
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
          <input type="text" name="fullName" value={formEmployer.fullName} onChange={handleChange} required />
        </p>
        <p>
          <label>Identifier</label>
          <br />
          <input type="text" name="identifier" value={formEmployer.identifier} onChange={handleChange} required />
        </p>
        <p>
          <label>Salary</label>
          <br />
          <input type="text" name="salary" value={formEmployer.salary} onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Add</button>
        </p>
      </form>
      {msg.length > 0 && (<p>{msg}</p>)}
      <br/>
      <button className="primary-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Add;
