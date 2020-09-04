const { read } = require("../util");

const getNode = (data) => ({
  data,
  right: undefined,
  left: undefined,
});

const print = (node, arr = []) => {
  if (node.left) {
    print(node.left, arr);
  }

  if (node.right) {
    print(node.right, arr);
  }

  arr.push(node.data);
  return arr;
};

const swapNodes = (indexes, queries) => {
  let root = getNode(1);

  let lastNodes = [root];

  // Set the tree
  while (queries.length) {
    const [left, right] = queries.shift();
    const lastNode = lastNodes.shift();

    if (left !== -1) {
      lastNode.left = getNode(left);
      lastNodes.push(lastNode.left);
    }

    if (right !== -1) {
      lastNode.right = getNode(right);
      lastNodes.push(lastNode.right);
    }
  }

  return print(root);
};

read("./swap-nodes-input.txt")
  .then(([_, ...inputs]) => {
    const queries = [];
    const indexes = [];

    inputs.forEach((el) => {
      const [n, nb] = el.split(" ");
      if (nb === undefined) {
        indexes.push(parseInt(n));
      } else {
        queries.push([parseInt(n), parseInt(nb)]);
      }
    });

    return swapNodes(indexes, queries);
  })
  .then(console.log);
