const { read } = require("../../../util");

const input = read("./data.txt");

class Node {
  constructor(name, number = 1) {
    this.name = name;
    this.number = number;
    this.edges = [];
  }

  addEdges(nodes) {
    this.edges = this.edges.concat([], nodes);
  }

  has(colour) {
    return this.edges.some((edge) => edge.name === colour);
  }
}

const parseSentenceToNodes = (sentence) => {
  const [root, rest] = sentence.split("bags contain");
  const resRest = rest.trim().split(",");

  const rootNode = new Node(root.trim());

  if (resRest.includes("no other bags")) {
    return rootNode;
  }
  const children = resRest.map((child) => {
    const childTrimmed = child
      .trim()
      .replace("bags", "")
      .replace("bag", "")
      .replace(".", "")
      .trim();

    const number = parseInt(childTrimmed[0]);
    const bagColor = childTrimmed.slice(2, childTrimmed.length);

    const node = new Node(bagColor, number);
    return node;
  });

  rootNode.addEdges(children);
  return rootNode;
};

const recursivelyLookup = (nodes, currentNode) => {
  if (currentNode.has("shiny gold")) {
    return true;
  }

  const res = [];
  for (node of currentNode.edges) {
    const nodeDeps = nodes.filter(
      (lookupNode) => lookupNode.name === node.name
    );

    res.push(nodeDeps.some((dep) => recursivelyLookup(nodes, dep)));
  }

  return res.some(Boolean);
};

input
  .then((content) => {
    const data = content.map(parseSentenceToNodes);
    const res = data.filter((currentNode) => {
      return recursivelyLookup(data, currentNode);
    });

    return res.length;
  })
  .then(console.log);
