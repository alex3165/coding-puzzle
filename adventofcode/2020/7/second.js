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
  const resRest = rest.trim();
  const rootNode = new Node(root.trim());

  if (resRest.includes("no other bags")) {
    return rootNode;
  }
  const children = resRest.split(",").map((child) => {
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

const recursivelyLookup = (nodes, currentNode, count = 0) => {
  for (let node of currentNode.edges) {
    const nodeDeps = nodes.filter(
      (lookupNode) => lookupNode.name === node.name
    );

    count +=
      nodeDeps.reduce((acc, next) => {
        return recursivelyLookup(nodes, next, acc) + next.number;
      }, 0) * node.number;
  }

  return count;
};

input
  .then((content) => {
    const data = content.map(parseSentenceToNodes);
    const shinyGoldNode = data.find((node) => node.name === "shiny gold");
    console.log(data);

    return recursivelyLookup(data, shinyGoldNode);
  })
  .then(console.log);
