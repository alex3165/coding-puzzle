const parse = entry => {
  const coordinatesString = entry.split("@")[1].trim();
  const offset = coordinatesString
    .split(":")[0]
    .split(",")
    .map(Number);
  const size = coordinatesString
    .split(":")[1]
    .split("x")
    .map(Number);

  return {
    id: entry.split("@")[0].replace("#", ""),
    coordinates: [
      [offset[0] + 1, offset[1] + 1],
      [offset[0] + size[0], offset[1] + size[1]]
    ]
  };
};

module.exports = {
  parse
};
