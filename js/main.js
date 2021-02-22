import {createAdvertisement} from './popup-card.js';
import {advertisements} from './data.js';
import './form.js';
import {advertisementForm, advertisementFormAddress} from './form.js';
import {mapForm, map} from './map.js';
import {disableDOMElement} from './util.js';

const pageLoad = () => {
  if (map._loaded) {
    console.log(map.getCenter());
    disableDOMElement(advertisementFormAddress);
    advertisementFormAddress.value = Object.values(map.getCenter())
      .map(item => item.toFixed(5))
      .join(', ');
  } else {
    advertisementForm.classList.add('ad-form--disabled');
    advertisementForm.childNodes.forEach(disableDOMElement);
    mapForm.classList.add('map__filters--disabled');
    mapForm.childNodes.forEach(disableDOMElement);
  }
}

pageLoad();

createAdvertisement(advertisements[1]);
