import {FLOAT_LENGTH} from './data.js';
import './form.js';
import {advertisementForm, advertisementFormAddress} from './form.js';
import {map} from './map.js';
import {disableDOMElement} from './util.js';

const mapForm = document.querySelector('.map__filters');

const pageLoad = () => {
  if (map._loaded) {
    const center = map.getCenter();
    disableDOMElement(advertisementFormAddress);
    advertisementFormAddress.value = `${center.lat.toFixed(FLOAT_LENGTH)}, ${center.lng.toFixed(FLOAT_LENGTH)}`;
  } else {
    advertisementForm.classList.add('ad-form--disabled');
    advertisementForm.childNodes.forEach(disableDOMElement);
    mapForm.classList.add('map__filters--disabled');
    mapForm.childNodes.forEach(disableDOMElement);
  }
}

pageLoad();
