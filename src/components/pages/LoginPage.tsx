import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    company: '',
    password: '',
    });
  const [isValid, setIsValid] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formLogin);
    if (formLogin.company === 'VNG' && formLogin.password === '1') {
      setIsValid(true);
    }
    if (isValid === true) {
      navigate('/home');
    }
    // const { identifier, lower, upper, proof, publicSignals} = formVerify;
  }
  return (
    <div className="text-center">
      <h2 className="main-title">Sign In</h2>
      <form action="/home" onSubmit={handleSubmit} >
        <p>
          <label>Company</label>
          <br />
          <input type="text" name="company" value={formLogin.company} onChange={handleChange} required />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type="password" name="password" value={formLogin.password} onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
      </form>
      <footer>
        <Link to="/"><p>Back to Homepage.</p></Link>
      </footer>
    </div>
  );
};

export default SignInPage;
