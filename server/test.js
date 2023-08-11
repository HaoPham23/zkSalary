const SalaryTree = require("./salaryTree");

var tree;
(async () => {
  tree = await SalaryTree.create(20);
  // console.log(typeof tree.hashFunction);
  await tree.read_from_csv('employees.csv');
  console.log(tree.elements);
  console.log(tree.get_proof_by_id('083203011953'));
  console.log(tree.getRoot());
})();

