Advisors: Nguyen Duy Hieu, Nguyen Anh Khoa

# zkSalary: Privacy-Protected Salary Verification
**zkSalary** is a cutting-edge application that enables individuals to provide a Groth16-based zero-knowledge proof, affirming their salary meets specific requirements, while safeguarding the privacy of exact figures. With **zkSalary**, users can confidently demonstrate compliance without compromising sensitive financial information, making **zkSalary** a valuable tool for ensuring privacy and trust in financial interactions.

Questions:

- WHY do we need zero-knowledge? The necessity of zero-knowledge becomes evident when considering the sensitivity of salary information. Revealing salaries is often perceived as a major breach of conduct within companies, and thus, preserving privacy becomes paramount.
- WHEN do we use this app? This application can be employed whenever a need arises to demonstrate one's income to a third party, such as banks or credit card providers. It allows users to furnish a secure proof of their earnings without compromising the exact figures.
- HOW can we prove? **zkSalary** employs the Groth16 protocol to facilitate the salary verification process. This cryptographic protocol enables users to validate their income while maintaining full confidentiality of the actual salary details.

## Scenario
Imagine you are an employee seeking to open a credit card account with a reputable bank. The bank requires proof that your salary falls within a specified range, say between 1 million and 4 million.

Traditionally, you would be compelled to share sensitive documents such as your employment contract, risking the exposure of your exact salary figure, which could be considered a breach of privacy.

However, there is a smarter and more secure way to achieve this. Introducing **zkSalary** - an application that empowers you to validate your employment status and salary range without disclosing the precise income amount.

## Design

### Solution
A solution designed to ensure confidentiality during salary verification processes involving three parties: the Company (C), You (Y), and the Bank (B).

- C: The HR department of the company maintains a secure Merkle Tree, consisting of hashed pairs (identifier, salary) for all employees. To protect individual salaries, C publicly shares only the Merkle Tree root.
- Y: As an employee, you can request C to provide a Merkle Proof, proving your existence within the company's Merkle Tree. Utilizing the powerful Groth16 protocol, you can then generate a zero-knowledge proof based on this information and your salary.
- B: As a verifier, B can efficiently verify the authenticity of the proof and ascertain that your salary falls within the desired range.

### Architecture

... Not yet!

## Development progress

- [x] Circuit design
- [x] FE design
- [ ] Login system
- [ ] BE design
- [ ] Testing

## Setup
Install all dependencies by `npm install`.

Run the back-end server (in port 8000):
```sh
cd file-server
node index.js
```

Start the front-end server (in port 3000):
```sh
npm start
```

The live server will be hosted at [`http://localhost:3000`](http://localhost:3000)!

## Circuit Testing

### Compile the circuit
Make sure you have installed `circom` and `snarkjs`

```sh
cd circuits
circom salary.circom --r1cs --wasm
```
### Run a trusted setup
Download [`powersOfTau28_hez_final_16.ptau`](https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_16.ptau).

```sh
cd circuits
snarkjs groth16 setup salary.r1cs powersOfTau28_hez_final_16.ptau salary.zkey
snarkjs zkey export verificationkey salary.zkey veri_key.json
```

### Generate a proof
Store your input signals in `./circuits/input.json`, which contains:

1. `identifier`: your identifier in company
2. `salary`: your salary
3. `lower`: the lowerbound of your salary
4. `upper`: the upperbound of your salary
5. `root`: the root of your company's Merkle Tree
6. `pathElements`: your Merkle Proof nodes
7. `pathIndices`: your Merkle Proof indices (0: left, 1: right)

Perform Groth16 full prove (includes create witness):

```sh
cd circuits
snarkjs g16f input.json ./salary_js/salary.wasm salary.zkey proof.json public.json
```

<!-- The `input.json` contains: 

1. `identifier`: Your identifier in company
2. `salary`: your salary
3. `lower`: the lowerbound of your salary
4. `upper`: the upperbound of your salary
5. `root`: the root of your company's Merkle Tree
6. `pathElements`: your Merkle Proof nodes
7. `pathIndices`: your Merkle Proof indices (0: left, 1: right) -->

The proof will prove that I am working in a company with a  `salary` such that `lower <= salary <= upper`.

### Verify the proof

```sh
snarkjs g16v veri_key.json public.json proof.json
```

*Note:* Check out `./circuits/example` for example.
