const FLOAT_LENGTH = 5;

const disableDOMElement = (element) => {
  element.disabled = true;
}

const enableDOMElement = (element) => {
  element.disabled = false;
}

const isEscEvent = (evt) => {
  return evt.key === 'Esc' || evt.key === 'Escape';
}

export {isEscEvent, disableDOMElement, enableDOMElement, FLOAT_LENGTH};
