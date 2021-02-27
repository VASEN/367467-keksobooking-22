import {advertisementForm, advertisementFormAddress, mapForm} from './form.js';
import {mapCanvas, map, positionMarker, CENTER_COORDS, MAP_ZOOM} from './map.js';

const FLOAT_LENGTH = 5;

const getRandomRangeInt = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }
  throw new Error('Неверно задан диапазон!');
};

const getRandomRangeFloat = function (start, end, length = 2) {
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return (Math.random() * (end - start) + start).toFixed(length);
  }
  throw new Error('Неверно задан диапазон!');
};

const disableDOMElement = (element) => {
  element.disabled = true;
}

const anableDOMElement = (element) => {
  element.disabled = false;
}

const mapFormDisable = () => {
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
}

const mapFormEnable = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(anableDOMElement);
}

const advertisementFormDisable = () => {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementForm.childNodes.forEach(disableDOMElement);
}

const advertisementFormEnable = () => {
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementForm.childNodes.forEach(anableDOMElement);
}

const showAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.style.zIndex = 401;
  alertElement.style.position = 'absolute';
  alertElement.style.left = 0;
  alertElement.style.top = 0;
  alertElement.style.right = 0;
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';
  alertElement.textContent = message;

  mapCanvas.appendChild(alertElement);
  mapFormDisable();
}

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
  // disableDOMElement(advertisementFormAddress);
  advertisementFormAddress.readOnly = true;
  advertisementFormAddress.value = `${center.lat.toFixed(FLOAT_LENGTH)}, ${center.lng.toFixed(FLOAT_LENGTH)}`;
}

const pageDeactivate = () => {
  mapCanvas.childNodes.forEach(item => item.hidden = true);
  advertisementFormDisable();
  mapFormDisable();
}

const reloadPage = () => {
  advertisementForm.reset();
  mapForm.reset();
  map.setView(CENTER_COORDS, MAP_ZOOM);
  positionMarker.setLatLng(CENTER_COORDS);
  advertisementFormAddress.value = `${CENTER_COORDS.lat.toFixed(FLOAT_LENGTH)}, ${CENTER_COORDS.lng.toFixed(FLOAT_LENGTH)}`;
}

const isEscEvent = (evt) => {
  return evt.key === 'Esc' || evt.key === 'Escape';
}

export {isEscEvent, reloadPage, pageActivate, pageDeactivate, showAlert, getRandomRangeInt, getRandomRangeFloat, disableDOMElement, anableDOMElement, FLOAT_LENGTH, mapFormDisable, mapFormEnable, advertisementFormDisable, advertisementFormEnable};
