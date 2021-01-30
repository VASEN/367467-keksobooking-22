const RANGE_START = 0;
const RANGE_END = 10;
const FLOAT_LENGTH = 6;

const numberToInteger = function (number) {
  return parseInt(number);
}

const getRandomRangeInt = function (start, end) {
  start = numberToInteger(start);
  end = numberToInteger(end);
  if (start >= 0 && end >= 0 && start !== end) {
    return (start < end)
      ? parseInt(Math.random() * (end - start) + start)
      : parseInt(Math.random() * (start - end) + end);
  }
  return 'Неверно задан диапазон!';
}

const getRandomRangeFloat = function (start, end, length = 2) {
  if (start >= 0 && end >= 0 && start !== end) {
    return (start < end)
      ? +(Math.random() * (end - start) + start).toFixed(length)
      : +(Math.random() * (start - end) + end).toFixed(length);
  }
  return 'Неверно задан диапазон!';
}

getRandomRangeInt(RANGE_START, RANGE_END);
getRandomRangeFloat(RANGE_START, RANGE_END, FLOAT_LENGTH);
