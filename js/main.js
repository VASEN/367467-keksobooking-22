'use strict';

const RANGE_START = 0;
const RANGE_END = 1;
const FLOAT_LENGTH = 6;

const getRandomRangeInt = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    if ((end - start) !== 1) {
      return Math.floor(Math.random() * (end - start) + start);
    } else {
      throw new Error('Слишком маленький диапазон!');
    }
  }
  throw new Error('Неверно задан диапазон!');
}

const getRandomRangeFloat = function (start, end, length = 2) {
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return (Math.random() * (end - start) + start).toFixed(length);
  }
  throw new Error('Неверно задан диапазон!');
}

getRandomRangeInt(RANGE_START, RANGE_END);
getRandomRangeFloat(RANGE_START, RANGE_END, FLOAT_LENGTH);
