import {disableDOMElement, enableDOMElement} from './util.js';

const mapForm = document.querySelector('.map__filters');

const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
};

const enableMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(enableDOMElement);
};

const setFilterForm = (cb) => {
  mapForm.addEventListener('change', () => {
    cb();
  });
}

export {disableMapForm, enableMapForm, setFilterForm, mapForm};
