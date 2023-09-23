const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const multer = require("multer");
const SalaryTree = require("./salaryTree");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

let tree;
async function initSalaryTree() {
    tree = await SalaryTree.init(20, 'payrolls.csv');
    console.log('SalaryTree initialized.');
}

initSalaryTree().catch((e) => {
    console.error('Error initializing SalaryTree:');
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

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("Uploaded file:", req.file);
    tree.setFilePath(req.file.path);
    return res.status(200).json({ message: "File uploaded successfully" });
  });


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