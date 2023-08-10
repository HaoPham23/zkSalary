import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";
import '../../App.css';

const Prover: React.FC = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        salary: '',
        lower: '',
        upper: ''
        });
    const [proof, setProof] = useState<string>('');
    const [signals, setSignals] = useState<string>('');
    // const wasmFile = 'http://localhost:8000/salary_js/salary.wasm';
    // const zkeyFile = 'http://localhost:8000/salary.zkey';
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData);
        const { identifier, salary, lower, upper } = formData;
        const proofInput = { identifier, salary, lower, upper };
        console.log(proofInput);
        fetch('http://localhost:8000/proofCalculate', {
            method: 'POST',
            body: JSON.stringify(proofInput),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            setProof(JSON.stringify(JSON.stringify(json["proof"], null)));
            setSignals(JSON.stringify(JSON.stringify(json["public"], null)));
        });
    };

    return (
        <div className="text-center">
        <h2 className="main-title">Prove</h2>
        <form action="/home" method="post" onSubmit={handleSubmit}>
            <p>
            <label>Identifier</label>
            <br />
            <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} required />
            </p>
            <p>
            <label>Salary (VND)</label>
            <br />
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} required />
            </p>
            <p>
            <label>Lowerbound (VND)</label>
            <br />
            <input type="text" name="lower" value={formData.lower} onChange={handleChange} required />
            </p>
            <p>
            <label>Upperbound (VND)</label>
            <br />
            <input type="text" name="upper" value={formData.upper} onChange={handleChange} required />
            </p>
            <p>
            <button id="sub_btn" type="submit">Prove</button>
            </p>
        </form>
        {proof.length > 0 && signals.length > 0 && (
            <div>
            <label style={{ color: 'white' }}>Proof and Signals</label>
            <div className= "proof" style={{padding: '10px' }}>
                <QRCode
                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                value={JSON.stringify({"proof": JSON.parse(proof), "signals": JSON.parse(signals)})}
                viewBox={`5 5 256 256`}
                />
            </div>
            </div>
        )}
        <footer>
            <Link to="/"><p>Back to Homepage.</p></Link>
        </footer>
        </div>
    );
    };

    export default Prover;
