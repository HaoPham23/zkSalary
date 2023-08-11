// const circom  = require('circomlibjs');
const {snarkjs} = require("snarkjs");
// const fs = require("fs");
const {MerkleTree }= require('fixed-merkle-tree')
export async function prove(identifier, salary, lower, upper, pathElements="", pathIndices="", root="") {
    var input = {}
    input["identifier"] = identifier;
    input["salary"] = salary;
    input["lower"] = lower;
    input["upper"] = upper;
    //temporary
    const mimc =  await circom.buildMimcSponge();
    const mimcspongehash = (left, right) => mimc.F.toString(mimc.multiHash([left,right]));
    const tree = new MerkleTree(20,[],{hashFunction:mimcspongehash,zeroElement: "21663839004416932945382355908790599225266501822907911457504978515578255421292"})
    // tree.insert("0");
    // tree.insert("1");
    // tree.insert("2");
    // let a = mimc.F.toString(mimc.multiHash([input["identifier"],input["salary"]]));
    // tree.insert(a);
    // input["root"] = tree.root;
    // const path = tree.path(tree.indexOf(a));
    // input["pathIndices"] = path["pathIndices"];
    // input["pathElements"] = path["pathElements"];
    //end
    // input["pathIndices"] = pathIndices;
    // input["pathElements"] = pathElements;
    // input["root"] = root;
    // const proof  =  await snarkjs.groth16.fullProve(input,"../../circuits/salary_js/salary.wasm","../../circuits/salary.zkey" );
    var proof = {};
    return JSON.stringify(proof);
}
// test1()

// test1()
// test2()
// test3()
// test4