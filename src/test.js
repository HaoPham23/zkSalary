const circom  = require('circomlibjs');
const snarkjs = require("snarkjs");
const fs = require("fs");
const {MerkleTree }= require('fixed-merkle-tree')

async function test1() {
    console.log("Test 1: Calculate proof correctly")
    input = {}
    input["identifier"] = "0356806508";
    input["salary"] = "3500000";
    input["lower"] = "1000000";
    input["upper"] = "4000000";
    const mimc =  await circom.buildMimcSponge();
    const mimcspongehash = (left, right) => mimc.F.toString(mimc.multiHash([left,right]));
    const tree = new MerkleTree(20,[],{hashFunction:mimcspongehash,zeroElement: "21663839004416932945382355908790599225266501822907911457504978515578255421292"})
    tree.insert("0");
    tree.insert("1");
    tree.insert("2");

    let a = mimc.F.toString(mimc.multiHash([input["identifier"],input["salary"]]));
    tree.insert(a);
    input["root"] = tree.root;
    console.log(input["root"]);
    path = tree.path(tree.indexOf(a));
    input["pathIndices"] = path["pathIndices"];
    input["pathElements"] = path["pathElements"];
    console.log(input["pathIndices"]);
    console.log(input["pathElements"]);
    let start = new Date();
    const proof  =  await snarkjs.groth16.fullProve(input,"../circuits_zkSalary/salary_js/salary.wasm","../circuits_zkSalary/salary.zkey" );
    let end = new Date();
    let timeElapsed = end-start;
    console.log("Time to gen proof test 1 :" + timeElapsed/1000);
    fs.writeFile("./test/proof1.json",JSON.stringify(proof["proof"]), function(err, result) {
        if(err) console.log('error', err);
    });
    fs.writeFile("./test/public1.json",JSON.stringify(proof["publicSignals"]), function(err, result) {
        if(err) console.log('error', err);
    });
    console.log("Finished calculating proof for test 1");
    return 0;

}
// test1()

test1()
// test2()
// test3()
// test4