import {FLOAT_LENGTH} from './data.js';
import './form.js';
import {advertisementForm, advertisementFormAddress} from './form.js';
import {map} from './map.js';
import {anableDOMElement, disableDOMElement} from './util.js';

const mapForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');

const pageDeactivate = () => {
  mapCanvas.childNodes.forEach(item => item.hidden = true);
  advertisementForm.classList.add('ad-form--disabled');
  advertisementForm.childNodes.forEach(disableDOMElement);
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
}

const pageActivate = () => {
  const center = map.getCenter();
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementForm.childNodes.forEach(anableDOMElement);
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(anableDOMElement);
  disableDOMElement(advertisementFormAddress);
  advertisementFormAddress.value = `${center.lat.toFixed(FLOAT_LENGTH)}, ${center.lng.toFixed(FLOAT_LENGTH)}`;
}

if (map._loaded) {
  pageActivate();
} else {
  pageDeactivate();
}
