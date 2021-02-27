import {sendData} from './server-data.js';
import {reloadPage} from './util.js';
import {showError} from './error.js';
import {showSuccess} from './success.js';

const pageContent = document.querySelector('main');
const mapForm = document.querySelector('.map__filters');
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
})

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      reloadPage();
      showSuccess();
    },
    () => showError(),
    new FormData(evt.target),
  )
});

export {pageContent, advertisementForm, advertisementFormAddress, mapForm};
