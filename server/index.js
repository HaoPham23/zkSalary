const express = require('express')
const snarkjs = require('snarkjs');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()
app.use(cors())
app.use(bodyParser.json());
const PORT = 8000;

app.post('/proofCalculate', (req, res) => {
    console.log("POST proofCalculte");
    let data = req.body;
    console.log(JSON.stringify(data));
    res.send({"proof": {"pi_a":["19792308378436113569135862864571097907351689314365800825401277972560713651737","1170342235777452115812696222368553937714588225930977569182781882294731839564","1"],"pi_b":[["15777660709461733638039200728746554949226163599394973150387064340292482625424","2528901491441257592248544747842138115321864504974008307516255874991266809255"],["13008679006940646908050034724569619893252943077768588423321403514451910083971","8416953986605914330105084009234377264921828870459761854251570776344323299940"],["1","0"]],"pi_c":["2887567606500902508136667564201866397753580802828659035607496164259906253084","15676819690698768246035769618131764671034226983242778781114533839388334683370","1"],"protocol":"groth16","curve":"bn128"}, "public": ["1","356806508","2757782102685905304639580622458489577116023122727954517187161089484557392843","1000000","4000000"]});
})

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
    .catch(err => {
        res.send({
            "result": false,
            "msg": "Invalid Input"
        })
    });
})

app.listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`))