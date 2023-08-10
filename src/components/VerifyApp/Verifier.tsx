import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import '../../App.css';
import Scanner from './Scanner';

const Verifier: React.FC = () => {
  const [data, setData] = useState('No result');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [formVerify, setFormVerify] = useState({
    proof: '',
    publicSignals: '',
    });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormVerify((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const { identifier, lower, upper, proof, publicSignals} = formVerify;
    const {proof, publicSignals} = formVerify;
    const _proof = JSON.parse(proof);
    const _signals = JSON.parse(publicSignals);
    fetch('http://localhost:8000/verify', {
      method: 'POST',
      body: JSON.stringify({"proof": _proof, "signals": _signals}),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      if (json["result"] === true) {
        setIsValid(true);
        setData(JSON.stringify(json["data"]));
      } else {
        setIsValid(false);
        console.log(json["msg"]);
        setErrorMsg(json["msg"]);
      }
    })
  }

  const handleScan = result => {
    try {
      var proofAndSignals = JSON.parse(result);

      setFormVerify(prevFormVerify => ({
        ...prevFormVerify,
        proof: proofAndSignals["proof"],
        publicSignals: proofAndSignals["signals"]
      }));
    } catch {
      setIsValid(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="main-title">Verify</h2>
      <form action="/home" method="post" onSubmit={handleSubmit}>
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
      {formVerify.proof.length > 0 && (
      <div>
      <label style={{ color: 'white' }}>Verify Result</label>
      <div className="verify">
          <br />
          <p>{isValid ? "Valid proof" : "Invalid proof"}</p>
      </div>
      </div>
        )}
      <Scanner onScan={handleScan}/>
      <p className='proof'>{data}</p>
      {errorMsg.length > 0 && (
        <p className='proof'>{errorMsg}
        </p>
      )}
      <footer>
        <Link to="/"><p>Back to Homepage.</p></Link>
      </footer>
    </div>
  );
};

export default Verifier;
