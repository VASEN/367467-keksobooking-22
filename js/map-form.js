import {disableDOMElement, enableDOMElement} from './util.js';
import {showError} from './error.js';

const mapForm = document.querySelector('.map__filters');

const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
};

const enableMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(enableDOMElement);
};

const getDataFailure = () => {
  disableMapForm();
  showError('Не удалось загрузить предложения!');
}

export {disableMapForm, enableMapForm, getDataFailure, mapForm};
