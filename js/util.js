const getRandomRangeInt = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }
  throw new Error('Неверно задан диапазон!');
};

const getRandomRangeFloat = function (start, end, length = 2) {
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return (Math.random() * (end - start) + start).toFixed(length);
  }
  throw new Error('Неверно задан диапазон!');
};

const disableDOMElement = (element) => {
  element.disabled = true;
}

const anableDOMElement = (element) => {
  element.disabled = false;
}

export {getRandomRangeInt, getRandomRangeFloat, disableDOMElement, anableDOMElement};
