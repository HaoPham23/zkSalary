Advisors: Nguyen Duy Hieu, Nguyen Anh Khoa

# zkSalary
This is an application for people to give a Groth16-based zero-knowledge proof to any party for proving the statement: "My salary meets your requirements!", without revealing the exact salary. 

Questions:

- WHY do we need zero-knowledge? Salary is one of the most sensitive pieces of information. Many companies consider salary revealing as the most misconducted behaviors.
- WHEN do we use this app? We can give this proof to any party (like banks or credit card providers) whenever they ask you to prove your income.
- HOW can we prove? By using Groth16 protocol.

## Design
### Scenario
Suppose you're working for a company.
You need to open credit card in a Bank. In order for the Bank to provide a credit limit, you need to prove that your salary in a desired range (say between 1 million and 4 millions). 
You can just provide your employment contract (which is very sensitive) to prove your existence in company together with the salary.

But you can do it better! You can prove your existence in the company, and your salary is between 1 and 4 millions, without providing a specific number!
### My solution

There are 3 parties: Company (C), You (Y) and the Bank (B):

- C: the HR of this company can maintain a Merkle Tree, which contains hashed pairs (identifier, salary) of all employers. HR then public the root to everyone. 

- Y: You can request C to provide a Merkle Proof for your existence in C's Merkle Tree. Using Groth16 protocol, you can generate zero-knowledge proof and provide to B.

- B: The bank receive Y's proof and verify.

.... not yet
## Development
I have just designed the circuit and provided an unit test. 

## Guide

### Compile the circuit
Make sure you have installed `circom` and `snarkjs`

```sh
cd circuits_zkSalary
circom salary.circom --r1cs --wasm
```
### Run a trusted setup
I used [`powersOfTau28_hez_final_16.ptau`](https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_16.ptau) to generate Groth16 parameters, this can support a circuit has up to $2^{16} = 65.536$ constraints.  


```sh
snarkjs groth16 setup salary.r1cs powersOfTau28_hez_final_16.ptau salary.zkey

snarkjs zkey export verificationkey salary.zkey ../server/veri_key.json
```

### Generate a proof
To generate an example proof, you can run `node test.js` in `server` folder (make sure you have installed all modules in `test.js` using `npm install`). 

You can create your own input to calculate the witness, then create a proof. To do so, first store your input data in `input.json` in folder `salary_js`, move to this folder and then run this command to generate a proof:

```sh
snarkjs g16f input.json salary.wasm ../salary.zkey proof.json public.json
```

The `input.json` contains: 

1. `identifier`: Your identifier in company
2. `salary`: your salary
3. `lower`: the lowerbound of your salary
4. `upper`: the upperbound of your salary
5. `root`: the root of your company's Merkle Tree
6. `pathElements`: your Merkle Proof nodes
7. `pathIndices`: your Merkle Proof indices (0: left, 1: right)

The proof will prove that I am working in a company with a  `salary` such that `lower <= salary <= upper`.

### Verify the proof

```sh
snarkjs g16v ../../server/veri_key.json public.json proof.json
```


