import { isNumber, max, sum } from 'lodash/fp';

export const abbreviateNumber = (num) => {
  if (!num && num !== 0) return num;

  if (num === 0) {
    return num;
  }

  if (isNaN(num)) {
    return 0;
  }

  if (num < 0.1) {
    return num.toFixed(2);
  }

  if (num < 1) {
    return num.toFixed(1);
  }

  if (num < 999999) {
    const precision = num % 1 > 0 ? 2 : 0;
    return Number(num).toLocaleString(undefined, {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    });
  }

  if (num < 10000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }

  if (num < 1000000000) {
    return Math.round(num / 1000000) + 'M';
  }

  if (num < 1000000000000) {
    return Math.round(num / 1000000000) + 'B';
  }

  return '1T+';
};

// scale a given number between a range - [scaledMin - scaledMax]
const scaleBetween = (array, scaledMin, scaledMax) => {
  const maxVal = max(array);
  const isEqual = array.every((val, i, arr) => val === arr[0]);

  if (isEqual) {
    return array.map(() => scaledMin + (scaledMax - scaledMin) / 2);
  }

  const delta = scaledMax - scaledMin;
  const ratios = array.map((val) => val / maxVal);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const totalRatios = ratios.reduce(reducer);
  const step = delta / totalRatios;

  return array.map((num) =>
    num === 0 ? scaledMin : (num / maxVal) * step + scaledMin
  );
};

// normalize an array of numbers - between min(100) and max
export const normalize = (data = [], maxVal) => {
  const min = 100;
  const result = data.map((val) => (!isNumber(val) || isNaN(val) ? 10 : val));

  let scaled = scaleBetween(result, min, maxVal);
  const total = sum(scaled);

  return scaled.map((val) => (val / total) * maxVal);
};

// utility for the centroid func
const pairwiseSumReduce = (array, f, init = 0) => {
  const n = array.length;
  return array.reduce((acc, p, i) => {
    if (i + 1 >= n) {
      return acc;
    }
    return acc + f(p, array[i + 1], i, array);
  }, init);
};

// find the visible centroid of a given path.
export const getCentroid = (polygonPoints) => {
  // poly area
  const area =
    pairwiseSumReduce(polygonPoints, (p1, p2) => p1.x * p2.y - p1.y * p2.x) / 2;

  // centroid x
  const cx =
    pairwiseSumReduce(
      polygonPoints,
      (p1, p2) => (p1.x + p2.x) * (p1.x * p2.y - p1.y * p2.x)
    ) /
    (6 * area);

  // centroid y
  const cy =
    pairwiseSumReduce(
      polygonPoints,
      (p1, p2) => (p1.y + p2.y) * (p1.x * p2.y - p1.y * p2.x)
    ) /
    (6 * area);

  return { x: cx, y: cy };
};
