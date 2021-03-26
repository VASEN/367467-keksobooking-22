const FLOAT_LENGTH = 5;

const escKeys = ['Esc', 'Escape'];

const disableDOMElement = (element) => {
  element.disabled = true;
}

const enableDOMElement = (element) => {
  element.disabled = false;
}

const isEscEvent = (evt) => {
  return escKeys.includes(evt.key);
}

export {isEscEvent, disableDOMElement, enableDOMElement, FLOAT_LENGTH};
