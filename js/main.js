import {createAdvertisement} from './popup-card.js';
import {advertisements} from './data.js';
import './form.js';
import {advertisementForm} from './form.js';
import {mapForm} from './map.js';
import {disableDOMElement} from './util.js';

const pageLoad = () => {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementForm.childNodes.forEach(disableDOMElement);
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
}

pageLoad();

createAdvertisement(advertisements[1]);
