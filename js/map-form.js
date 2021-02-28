import {disableDOMElement, enableDOMElement} from './util.js';

const mapForm = document.querySelector('.map__filters');

const mapFormDisable = () => {
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
};

const mapFormEnable = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(enableDOMElement);
};

export {mapFormDisable, mapFormEnable, mapForm};
