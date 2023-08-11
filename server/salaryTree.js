const { MerkleTree }= require('fixed-merkle-tree');
const circom  = require('circomlibjs');
const { parse } = require("csv-parse");
const snarkjs = require('snarkjs');
const fs = require('fs');

class SalaryTree {
    constructor(levels, filePath) {
        this.elements = {};
        this.levels = levels;
        this.filePath = filePath;
    }
    async create() {
        this.mimc = await circom.buildMimcSponge();
        this.hashFunction = (left, right) => this.mimc.F.toString(this.mimc.multiHash([left, right]));
        await this._read_from_csv();
    }

    static async init(levels, filePath) {
        const obj = new SalaryTree(levels, filePath);
        await obj.create();
        return obj;
    }

    getRoot() {
        return this.tree.root;
    }

    async _read_from_csv() {
        var self = this;
        self.tree = new MerkleTree(self.levels, [],{
            hashFunction: self.hashFunction, 
            zeroElement: "21663839004416932945382355908790599225266501822907911457504978515578255421292"
        });
        return new Promise((resolve, reject) => {
            fs.createReadStream(self.filePath)
                .pipe(parse({from_line: 2}))
                .on('data', (data) => {
                    self.elements[data[1]] = [data[0], data[2]];
                    const a = self.hashFunction(self._id_to_number(data[1]),data[2]);
                    self.tree.insert(a);
                })
                .on('end', () => {
                    resolve();
                })
        });
    }

    _id_to_number(id) {
        return id.toString();
    }

    getName(identifier) {
        if (! (identifier in this.elements)) {
            throw new Error('Not found');
        }
        return this.elements[identifier][0];
    }

    getSalary(identifier) {
        if (! (identifier in this.elements)) {
            throw new Error('Not found');
        }
        return this.elements[identifier][1];
    }

    getPublic(publicSignals) {
        const identifier = publicSignals[1];
        const root = publicSignals[2];
        const lower = publicSignals[3];
        const upper = publicSignals[4];
        return {identifier, root, lower, upper}
    }

    _get_merkle_proof(identifier) {
        if (! (identifier in this.elements)) {
            throw new Error('Not found');
        }
        let salary = this.getSalary(identifier);
        let hash_value = this.hashFunction(this._id_to_number(identifier), salary);
        const path = this.tree.path(this.tree.indexOf(hash_value));
        return path;
    }

    async getProof(identifier, salary, lower, upper) {
        if (! (identifier in this.elements)) {
            throw new Error('Not found');
        }
        const merkleProof = this._get_merkle_proof(identifier);
        let input = {};
        input.identifier = this._id_to_number(identifier);
        input.lower = lower;
        input.upper = upper;
        input.salary = this.getSalary(identifier);
        if (input.salary !== salary) {
            throw new Error('Invalid Input');
        }
        input.root = merkleProof.pathRoot;
        input.pathElements = merkleProof.pathElements;
        input.pathIndices = merkleProof.pathIndices;
        const proof = await snarkjs.groth16.fullProve(input, "../circuits/salary_js/salary.wasm", "../circuits/salary.zkey");
        return proof;
    }

    async verifyProof(proof, publicSignals) {
        publicSignals[1] = this._id_to_number(publicSignals[1]);
        const vkey = JSON.parse(fs.readFileSync('../circuits/veri_key.json'));
        const result = await snarkjs.groth16.verify(vkey, publicSignals, proof);
        return result;
    }
}

module.exports = SalaryTree;