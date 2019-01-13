const getLengthAfterReaction = chars => {
  let index = 1;

  while (index < chars.length) {
    if (index === 0) {
      index = 1;
      continue;
    }

    const prev = chars[index - 1];
    const current = chars[index];

    if (prev !== current && prev.toLowerCase() === current.toLowerCase()) {
      chars = chars.slice(0, index - 1).concat(chars.slice(index + 1));
      index = index - 1;
      continue;
    }

    index++;
  }

  return chars.length;
};

module.exports = {
  getLengthAfterReaction
};
