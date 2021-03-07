import './ad-form.js';
import {FLOAT_LENGTH} from './util.js';
import {createPopup, map, mapCanvas, positionMarker} from './map.js';
import {getData} from './server-data.js';
import {getDataFailure} from './error.js';
import {mapFormDisable, mapFormEnable} from './map-form.js';
import {advertisementFormEnable, advertisementFormDisable, advertisementFormAddress} from './ad-form.js';

const pageActivate = () => {
  const center = map.getCenter();
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  positionMarker.addTo(map);
  mapCanvas.childNodes.forEach(item => item.hidden = false);
  advertisementFormEnable();
  mapFormEnable();
  advertisementFormAddress.value = `${center.lat.toFixed(FLOAT_LENGTH)}, ${center.lng.toFixed(FLOAT_LENGTH)}`;
}

const pageDeactivate = () => {
  mapCanvas.childNodes.forEach(item => item.hidden = true);
  advertisementFormDisable();
  mapFormDisable();
}

if (map) {
  pageActivate();
  getData((item) => createPopup(item), () => getDataFailure());
} else {
  pageDeactivate();
}
