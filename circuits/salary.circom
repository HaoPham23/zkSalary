pragma circom  2.0.0;

include "./utils/circuits/comparators.circom";
include "./utils/circuits/mimcsponge.circom";


// Hash two children nodes of Merkle Tree
template HashLeftRight() {
    signal input left;
    signal input right;
    signal output hash;
    // MiMCSponge(nInputs, nRounds, nOutputs)
    component hasher = MiMCSponge(2, 220, 1);
    hasher.ins[0] <== left;
    hasher.ins[1] <== right;
    hasher.k <== 0;
    hash <== hasher.outs[0];
}

// if s == 0 returns [in[0], in[1]]
// if s == 1 returns [in[1], in[0]]
template DualMux() {
    signal input in[2];
    signal input s;
    signal output out[2];

    s * (1 - s) === 0;
    out[0] <== (in[1] - in[0])*s + in[0];
    out[1] <== (in[0] - in[1])*s + in[1];
}

// Verifies that merkle proof is correct for given merkle root and a leaf
// pathIndices input is an array of 0/1 selectors telling whether given pathElement is on the left or right side of merkle path
template MerkleTreeChecker(levels) {
    signal input leaf;
    signal input pathElements[levels];
    signal input pathIndices[levels];
    signal input root;

    component selectors[levels];
    component hashers[levels];

    for (var i = 0; i < levels; i++) {
        selectors[i] = DualMux();
        selectors[i].in[0] <== i == 0 ? leaf : hashers[i - 1].hash;
        selectors[i].in[1] <== pathElements[i];
        selectors[i].s <== pathIndices[i];

        hashers[i] = HashLeftRight();
        hashers[i].left <== selectors[i].out[0];
        hashers[i].right <== selectors[i].out[1];
    }

    root === hashers[levels - 1].hash;
}

template CheckSalary(levels) {
    signal input identifier;
    signal input salary;

    signal input root;                  // Root of Merkle Tree
    signal input pathElements[levels];
    signal input pathIndices[levels];  

    signal input lower;
    signal input upper;
    signal output out;

    // Calculate MiMCSponge(identifier + salary)
    component hasher = MiMCSponge(2, 220, 1);
    hasher.ins[0] <== identifier;
    hasher.ins[1] <== salary;
    hasher.k <== 0;

    //Check user existence
    component tree = MerkleTreeChecker(levels);
    tree.leaf <== hasher.outs[0];
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }

    // Ensure lower <= upper
    // 40 is the number of bits the input  have. 2^40 ~= 1000 billions VND
    component validInputChecker = LessEqThan(40);
    validInputChecker.in[0] <== lower;
    validInputChecker.in[1] <== upper;
    validInputChecker.out === 1;

    // Check if lower <= salary <= upper
    component checker = LessEqThan(80);
    checker.in[0] <== 0;
    checker.in[1] <== (upper - salary) * (salary - lower);

    out <== checker.out;
}

component main {public [identifier, root, lower, upper]} = CheckSalary(20);
