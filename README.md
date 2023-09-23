Advisors: Nguyen Duy Hieu, Nguyen Anh Khoa

# zkSalary: A Privacy-Preserving System for Salary Verification Using zk-SNARK
The **zkSalary** system provides a secure, transparent and privacy-enhancing solution for both employers and employees without revealing sensitive salary details during the verification process. The proofs can be generated within a few seconds and succint to transfer to the verifier via plaintext or QR code.

# System Architecture

![System Architecture](/system_arch.png "System Architecture")

The **zkSalary** system consists of three parties: 
- **Employer's server**: This is where to store the payrolls and generate zk-SNARK proofs. Each server should be owned by only one employer in order to keep its payroll's secrecy.
- **Employee's app**: Employees use this app to create proof request and receive proof from employer's server. This application requires user authentication to verify the validity of the proof request (preventing unauthorized proof generation).
- **Verifier's app**: This application is used by verifiers to verify the proof sent by an employee. It does not require user authentication from verifiers, since there is no harm if a proof is verified by someone inadvertently.
# System Workflow

 First, (1) the HR Manager of the employer pushs payrolls to Employer's Server. Then, (2) Employer's Server builds a Merkle Tree for this payrolls and publishes the Merkle root to public, allows any party to use this root for verification processes. Whenever an employee need a salary proof for verification, (3) she logs in to the Employee's App, then submits a proof request which is a form containing two values called $lowerbound$ and $upperbound$. (4) The proof request is then sent to Employer's Server. In Employer's Server, (5) it checks the validity of this request, then generates a zk-SNARK proof which is sent back to the Employee's App. At this step, (6) the proof is sent back to the employee via QR code for convenience. With the proof in hand, (7) she can come to any verifier and shows him the proof for verification. Then, (8) the verifier uses his own app to scan the QR code and verify the proof. After verifying the validity of the proof, (9) the app compares the Merkle root in the proof with the Merkle root of this employer which can be found in public. Finally, (10) the Verifier's App returns Accept or Reject status, together with some public data such as Employee's name, lowerbound, upperbound and the Merkle root.

# Demo
[Link video demo](https://www.youtube.com/watch?v=PIHnsbfFJp0)

# Setup
Install all dependencies by `npm install`.

Start the front-end server (in port 3000):
```sh
npm start
```

Run the back-end server (in port 8000):
```sh
cd file-server
node index.js
```

The live server will be hosted at [`http://localhost:3000`](http://localhost:3000)!
