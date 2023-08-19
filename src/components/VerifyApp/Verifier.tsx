import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Scanner from './Scanner';

const Verifier: React.FC = () => {
  const [data, setData] = useState({root: undefined});
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
    const {proof, publicSignals} = formVerify;
    const _proof = JSON.parse(proof);
    const _signals = JSON.parse(publicSignals);
    fetch('http://localhost:8000/verify', {
      method: 'POST',
      body: JSON.stringify({"proof": _proof, "publicSignals": _signals}),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      if (res["result"] === true) {
        setIsValid(true);
        setData(res["data"]);
      } else {
        setIsValid(false);
        setErrorMsg(res["msg"]);
      }
    })
  }

  const handleScan = (result: any) => {
    try {
      var proofAndSignals = JSON.parse(result);
      console.log(proofAndSignals);
      setFormVerify(prevFormVerify => ({
        ...prevFormVerify,
        proof: JSON.stringify(proofAndSignals.proof),
        publicSignals: JSON.stringify(proofAndSignals.publicSignals)
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
      <div>
          <p>{isValid ? "Valid proof" : "Invalid proof"}</p>
      </div>
      </div>
        )}
      <Scanner onScan={handleScan}/>
      <br/>
      {data.root !== undefined && (<table className='json-table'>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>)}
      {errorMsg.length > 0 && (
        <p>{errorMsg}</p>
      )}
      <br/>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>

    </div>
  );
};

export default Verifier;
