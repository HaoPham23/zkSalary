const express = require('express')
const snarkjs = require('snarkjs');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()
const SalaryTree = require("./salaryTree");

let tree;
async function initSalaryTree() {
    tree = await SalaryTree.init(20, 'employees.csv');
    console.log('SalaryTree initialized.');
}

initSalaryTree().catch((e) => {
    console.error('Error initializing SalaryTree:', e);
})

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
    // Add employee's data to csv file
app.post('/add', async (req, res) => {
    console.log("POST add");
    const { fullName, identifier, salary} = req.body;

    if (!fullName || !identifier || !salary) {
      return res.json({ error: 'Invalid Input' });
    }
    const csvData = `${fullName},${identifier},${salary}\n`;
    const data = fs.readFileSync('employees.csv', 'utf8');
    if(data.includes(identifier)) {
        return res.json({ error: "Identifier exists"});
    }
    fs.appendFile('employees.csv', csvData, async (err) => {
        if (err) {
            console.error(err);
            return res.json({ error: 'Failed to store data.' });
        }
        await tree._read_from_csv();
        return res.json({ message: 'Data stored successfully.' });
    });
})

// For Prover
app.post('/proofCalculate', async (req, res) => {
    console.log("POST proofCalculte");
    try {
        let {identifier, salary, lower, upper} = req.body;
        const proof = await tree.getProof(identifier, salary, lower, upper);
        return res.json({result: true, proof: proof.proof, publicSignals: proof.publicSignals});
    } catch (e) {
        return res.json({result: false, msg: e});
    }
})

// For Verifier
app.post('/verify', async (req, res) => {
    console.log("POST verify");
    let msg = '';
    let data = {};
    let result = false;
    try {
    const {proof, publicSignals} = req.body;
    const {identifier, root, lower, upper} = tree.getPublic(publicSignals);
    result = await tree.verifyProof(proof, publicSignals);
    if (result === true) {
        data = {
            name: tree.getName(identifier),
            identifier,
            root,
            lower,
            upper
        };
        msg = 'Succeed';
        if (root !== tree.getRoot()) {
            result = false;
            msg = 'Invalid Root';
        }
    } else {
        msg = "Invalid Proof";
    }
    } catch (e) {
        msg = 'Invalid Input';
    }
    return res.json({
        result,
        msg,
        data
    })
})

app.listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`))