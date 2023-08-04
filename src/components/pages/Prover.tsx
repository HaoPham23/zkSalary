import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const snarkjs = require('snarkjs');

const makeProof = async (_proofInput: any, _wasm: string, _zkey: string) => {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    _proofInput,_wasm,_zkey
  );
  return { proof, publicSignals };
};

const Prover: React.FC = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        salary: '',
        lower: '',
        upper: ''
        });
    const [proof, setProof] = useState<string>('');
    const [signals, setSignals] = useState<string>('');
    const wasmFile = 'http://localhost:8000/salary_js/salary.wasm';
    const zkeyFile = 'http://localhost:8000/salary.zkey';
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const { identifier, salary, lower, upper } = formData;
        const root = "2757782102685905304639580622458489577116023122727954517187161089484557392843";
        const pathIndices = [
        1, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
        ];
        const pathElements = [
        "2",
        "20817788844844400846305593449019051859483675600760331396756186604441020904869",
        "7833458610320835472520144237082236871909694928684820466656733259024982655488",
        "14506027710748750947258687001455876266559341618222612722926156490737302846427",
        "4766583705360062980279572762279781527342845808161105063909171241304075622345",
        "16640205414190175414380077665118269450294358858897019640557533278896634808665",
        "13024477302430254842915163302704885770955784224100349847438808884122720088412",
        "11345696205391376769769683860277269518617256738724086786512014734609753488820",
        "17235543131546745471991808272245772046758360534180976603221801364506032471936",
        "155962837046691114236524362966874066300454611955781275944230309195800494087",
        "14030416097908897320437553787826300082392928432242046897689557706485311282736",
        "12626316503845421241020584259526236205728737442715389902276517188414400172517",
        "6729873933803351171051407921027021443029157982378522227479748669930764447503",
        "12963910739953248305308691828220784129233893953613908022664851984069510335421",
        "8697310796973811813791996651816817650608143394255750603240183429036696711432",
        "9001816533475173848300051969191408053495003693097546138634479732228054209462",
        "13882856022500117449912597249521445907860641470008251408376408693167665584212",
        "6167697920744083294431071781953545901493956884412099107903554924846764168938",
        "16572499860108808790864031418434474032816278079272694833180094335573354127261",
        "11544818037702067293688063426012553693851444915243122674915303779243865603077"
        ];
        const proofInput = { identifier, salary, lower, upper ,root, pathElements, pathIndices};
        makeProof(proofInput, wasmFile, zkeyFile).then(({ proof: _proof, publicSignals: _signals }) => {
        setProof(JSON.stringify(_proof, null, 2));
        setSignals(JSON.stringify(_signals, null, 2));
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
        {proof.length > 0 && (
            <div>
            <label style={{ color: 'white' }}>Proof</label>
            <div className="proof">
                <br />
                <p>{proof}</p>
            </div>
            </div>
        )}
        <br/>
        {signals.length > 0 && (
            <div>
            <label style={{ color: 'white' }}>Public</label>
            <div className="proof">
                <br />
                <p>{signals}</p>
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
