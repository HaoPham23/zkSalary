import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
const snarkjs = require('snarkjs');

const verifyProof = async (_verificationkey: string, signals: any, proof: any) => {
	const vkey = await fetch(_verificationkey).then(function (res) {
		return res.json();
	});
	const res = await snarkjs.groth16.verify(vkey, signals, proof);
	return res;
};

const Verifier: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const [formVerify, setFormVerify] = useState({
    identifier: '',
    lower: '',
    upper: '',
    proof: '',
    publicSignals: '',
    });
  const verificationKey = 'http://localhost:8000/veri_key.json';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormVerify((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formVerify);
    const { identifier, lower, upper, proof, publicSignals} = formVerify;
    const _proof = JSON.parse(proof);
    const _signals = JSON.parse(publicSignals);
    verifyProof(verificationKey, _signals, _proof).then((_isValid) => {
      setIsValid(_isValid);
      console.log(_isValid);
    });
  }
  return (
    <div className="text-center">
      <h2 className="main-title">Verify</h2>
      <form action="/home" method="post" onSubmit={handleSubmit}>
        <p>
          <label>Identifier</label>
          <br />
          <input type="text" name="identifier" value={formVerify.identifier} onChange={handleChange} required />
        </p>
        <p>
          <label>Lowerbound</label>
          <br />
          <input type="text" name="lower" value={formVerify.lower} onChange={handleChange} required />
        </p>
        <p>
          <label>Upperbound</label>
          <br />
          <input type="text" name="upper" value={formVerify.upper} onChange={handleChange} required />
        </p>
        <p>
          <label>Proof</label>
          <br />
          <input type="text" name="proof" value={formVerify.proof} onChange={handleChange} required />
        </p>
        <p>
          <label>Public Signals</label>
          <br />
          <input type="text" name="publicSignals" value={formVerify.publicSignals} onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Verify</button>
        </p>
      </form>
      <div>
        <label style={{ color: 'white' }}>Verify Result</label>
        <div className="proof">
            <br />
            <p>{isValid ? "Valid proof" : "Invalid proof"}</p>
        </div>
      </div>
      <footer>
        <Link to="/"><p>Back to Homepage.</p></Link>
      </footer>
    </div>
  );
};

export default Verifier;
