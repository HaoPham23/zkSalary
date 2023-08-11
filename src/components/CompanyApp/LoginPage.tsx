import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import '../../App.css';

const LogInPage: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>('');
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
    });
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
    fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify(formLogin),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setAuth({token: res["token"]});
      })
      .catch((e) => {
        setErrMsg('Login Failed');
      })
    if (auth.token === true) {
      navigate("/home");
    } else {
      setErrMsg('Login Failed');
    }
  }
  return (
    <div className="text-center">
      <h2 className="main-title">Sign In</h2>
      <form action="/home" onSubmit={handleSubmit} >
        <p>
          <label>Username</label>
          <br />
          <input type="text" name="username" value={formLogin.username} onChange={handleChange} required />
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
      {errMsg.length > 0 && (<p>{errMsg}</p>)}
      <br/>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>
    </div>
  );
};

export default LogInPage;
