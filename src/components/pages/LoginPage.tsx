import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';

const SignInPage: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="main-title">Sign In</h2>
      <form action="/home">
        <p>
          <label>Company</label>
          <br />
          <input type="text" name="company" required />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type="password" name="password" required />
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
