import {FLOAT_LENGTH} from './data.js';
import './form.js';
import {advertisementForm, advertisementFormAddress} from './form.js';
import {mapForm, map} from './map.js';
import {disableDOMElement} from './util.js';

const pageLoad = () => {
  if (map._loaded) {
    disableDOMElement(advertisementFormAddress);
    advertisementFormAddress.value = `${map.getCenter().lat.toFixed(FLOAT_LENGTH)}, ${map.getCenter().lng.toFixed(FLOAT_LENGTH)}`;
  } else {
    advertisementForm.classList.add('ad-form--disabled');
    advertisementForm.childNodes.forEach(disableDOMElement);
    mapForm.classList.add('map__filters--disabled');
    mapForm.childNodes.forEach(disableDOMElement);
  }
}

pageLoad();
