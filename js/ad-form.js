import {sendData} from './server-data.js';
import {disableDOMElement, enableDOMElement, FLOAT_LENGTH} from './util.js';
import {showError} from './error.js';
import {showSuccess} from './success.js';
import {CENTER_COORDS, map, MAP_ZOOM, positionMarker} from './map.js';
import {mapForm} from './map-form.js';

const advertisementForm = document.querySelector('.ad-form');
const advertisementFormAddress = advertisementForm.querySelector('#address');
const advertisementFormType = advertisementForm.querySelector('#type');
const advertisementFormPrice = advertisementForm.querySelector('#price');
const advertisementFormCheckin = advertisementForm.querySelector('#timein');
const advertisementFormCheckout = advertisementForm.querySelector('#timeout');
const advertisementFormReset = advertisementForm.querySelector('.ad-form__reset');

const typeConvertToPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

const advertisementFormDisable = () => {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementForm.childNodes.forEach(disableDOMElement);
};

const advertisementFormEnable = () => {
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementForm.childNodes.forEach(enableDOMElement);
};

const reloadPage = () => {
  advertisementForm.reset();
  mapForm.reset();
  map.setView(CENTER_COORDS, MAP_ZOOM);
  positionMarker.setLatLng(CENTER_COORDS);
  advertisementFormAddress.value = `${CENTER_COORDS.lat.toFixed(FLOAT_LENGTH)}, ${CENTER_COORDS.lng.toFixed(FLOAT_LENGTH)}`;
};

advertisementFormType.addEventListener('change', () => {
  advertisementFormPrice.min = typeConvertToPrice[advertisementFormType.value];
  advertisementFormPrice.placeholder = typeConvertToPrice[advertisementFormType.value];
});

advertisementFormCheckin.addEventListener('change', () => {
  advertisementFormCheckout.value = advertisementFormCheckin.value;
});

advertisementFormCheckout.addEventListener('change', () => {
  advertisementFormCheckin.value = advertisementFormCheckout.value;
});

advertisementFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  reloadPage();
});

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      reloadPage();
      showSuccess();
    },
    showError('Ошибка отправки формы!'),
    new FormData(evt.target),
  )
});

export {advertisementForm, advertisementFormAddress, advertisementFormDisable, advertisementFormEnable};
