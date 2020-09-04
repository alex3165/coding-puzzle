const node = (val, right, left) => ({
  val,
  left,
  right
});

const getLeftMostNode = node => {
  return !!node.left ? getLeftMostNode(node.left) : node;
};

const parse = exp => {
  const arr = exp.split("");
  const first = arr.shift();

  const tree = { right: first };

  const symbols = ["+", "*"];

  for (let i in arr) {
    const index = parseInt(i);
    const el = arr[index];

    const node = getLeftMostNode(tree);
    // console.log(node, el, index, arr[index + 1]);

    if (!node.right && !symbols.includes(el)) {
      node.right = el;
      continue;
    }

    if (!node.val && symbols.includes(el)) {
      node.val = el;
      continue;
    }
    if (node.right && node.val && arr[index + 1] === undefined) {
      node.left = el;
      continue;
    }

    if (node.right && node.val) {
      node.left = { right: el };
      continue;
    }
  }

  return tree;
};

const expression = "c+b*a";
/*

    +
  *   c
b   a

*/

console.log(parse(expression));
