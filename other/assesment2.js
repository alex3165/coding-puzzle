// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

const strNum = (str1, str2) => {
  let pivot = 0;

  while (
    str1.charCodeAt(pivot) === str2.charCodeAt(pivot) &&
    pivot < str1.length &&
    pivot < str2.length
  ) {
    pivot++;
  }

  const isEqual = pivot === str1.length && pivot === str2.length;

  return isEqual ? undefined : [str1.charCodeAt(pivot), str2.charCodeAt(pivot)];
};

function prioritizedOrders(numOrders, orderList) {
  const primes = [];
  const sortedOthers = [];

  for (const order of orderList) {
    const orderArr = order.split(' ');
    if (!isNaN(parseInt(orderArr[1]))) {
      sortedOthers.push(order);
      continue;
    }

    primes.push(order);
  }

  const sortedPrimes = primes.sort((a, b) => {
    const splittedA = a.split(' ');
    const splittedB = b.split(' ');

    const aEval = splittedA.slice(1).join('');
    const bEval = splittedB.slice(1).join('');

    const res = strNum(aEval, bEval);
    if (res) {
      return res[0] - res[1];
    }

    const identifierRes = strNum(splittedA[0], splittedB[0]);

    return identifierRes ? identifierRes[0] - identifierRes[1] : 0;
  });

  return sortedPrimes.concat(sortedOthers);
}

const res = prioritizedOrders(2, [
  'zld 93 12',
  'fp kindle book',
  '10a echo show',
  '17g 12 25 6',
  'ab1 kindle book',
  '125 echo dot second generation'
]);

console.log(res);
