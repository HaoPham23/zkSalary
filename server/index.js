const express = require('express')
const snarkjs = require('snarkjs');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()

app.use(cors())
app.use(bodyParser.json());
const PORT = 8000;
// For Company (HR)
app.post('/login', (req, res) => {
    console.log("POST login");
    try {
        let {username, password} = req.body;
        if (username === 'admin' && password === '1') {
            return res.json({token: true});
        }
    } catch (e) {
        console.log(`/login error`);
    }
    return res.json({token: false});
})

app.post('/add', (req, res) => {
    console.log("POST add");
    const { fullName, identifier, salary} = req.body;

    if (!fullName || !identifier || !salary) {
      return res.json({ error: 'Username and age are required.' });
    }
    const csvData = `${fullName},${identifier},${salary}\n`;
    const data = fs.readFileSync('employees.csv', 'utf8');
    if(data.includes(identifier)) {
        return res.json({ error: "Identifier exists"});
    }
    fs.appendFile('employees.csv', csvData, (err) => {
        if (err) {
            console.error(err);
            return res.json({ error: 'Failed to store data.' });
        }
        return res.json({ message: 'Data stored successfully.' });
    });
})

// For Prover
app.post('/proofCalculate', async (req, res) => {
    console.log("POST proofCalculte");
    let data = req.body;
    console.log(JSON.stringify(data));
    let merkleProof = {
        root: "2757782102685905304639580622458489577116023122727954517187161089484557392843",
        pathIndices: [
          1, 1, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0
        ],
        pathElements: [
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
        ]
    }
    let input = {};
    input["identifier"] = data.identifier;
    input["salary"] = data.salary;
    input["lower"] = data.lower;
    input["upper"] = data.upper;
    input["root"] = merkleProof.root;
    input["pathElements"] = merkleProof.pathElements;
    input["pathIndices"] = merkleProof.pathIndices;
    // console.log(input);
    // const wasmFile = fs.readFileSync('../circuits/salary_js/salary.wasm');
    // const zkey = fs.readFileSync('../circuits/salary.zkey');
    snarkjs.groth16.fullProve(input, "../circuits/salary_js/salary.wasm", "../circuits/salary.zkey")
    .then((proof) => {
        // console.log(proof);
        res.send({result: true, proof: proof.proof, publicSignals: proof.publicSignals});
        return;
    })
    .catch((e) => {
        res.send({result: false});
        return;
    });
})

// For Verifier
app.post('/verify', (req, res) => {
    console.log("POST verify");
    let data = req.body;
    const {proof, signals} = data;
    const vkey = JSON.parse(fs.readFileSync('../circuits/veri_key.json'));
    snarkjs.groth16.verify(vkey, signals, proof)
    .then((result) => {
        if (result === true) {
            res.send({
                result,
                "data": {
                    "name": "Pham Duc Hao",
                    "identifier": "083203011953",
                    "lower": "1000000",
                    "upper": "4000000"
                }
            })
        } else {
            res.send({
                result,
                "msg": "Invalid Proof"
            })
        }
    })
    .catch((err) => {
        res.send({
            "result": false,
            "msg": "Invalid Input"
        })
    });
})

app.listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`))