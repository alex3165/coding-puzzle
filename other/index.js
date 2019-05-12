function cellCompete(states, days) {
  const dayRange = [...Array(days).keys()];
  let currentState = states;

  dayRange.forEach(() => {
    const nextState = currentState.map((state, index) => {
      const prevState = index === 0 ? 0 : currentState[index - 1];
      const nextState =
        index === currentState.length - 1 ? 0 : currentState[index + 1];

      if (prevState === nextState) {
        return 0;
      }

      return 1;
    });
    console.log(nextState);
    currentState = [...nextState];
  });

  return currentState;
  // WRITE YOUR CODE HERE
}

console.log(cellCompete([], 3));
// 23280720399127
