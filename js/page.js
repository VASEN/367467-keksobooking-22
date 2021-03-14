import {map, mapCanvas, positionMarker} from './map.js';
import {advertisementFormAddress, disableAdvertisementForm, enableAdvertisementForm} from './ad-form.js';
import {disableMapForm, enableMapForm} from './map-form.js';
import {FLOAT_LENGTH} from './util.js';

const activatePage = () => {
  const center = map.getCenter();
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  positionMarker.addTo(map);
  mapCanvas.childNodes.forEach(item => item.hidden = false);
  enableAdvertisementForm();
  enableMapForm();
  advertisementFormAddress.value = `${center.lat.toFixed(FLOAT_LENGTH)}, ${center.lng.toFixed(FLOAT_LENGTH)}`;
}

const deactivatePage = () => {
  mapCanvas.childNodes.forEach(item => item.hidden = true);
  disableAdvertisementForm();
  disableMapForm();
}

export {activatePage, deactivatePage};
