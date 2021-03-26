import {getData, sendData} from './server-data.js';
import {disableDOMElement, enableDOMElement, FLOAT_LENGTH} from './util.js';
import {showError} from './error.js';
import {showSuccess} from './success.js';
import {CENTER_COORDS, clearMarkers, map, MAP_ZOOM, positionMarker} from './map.js';
import {mapForm} from './map-form.js';
import {clearImages, getImage} from './images.js';
import {getDataSuccess, getDataFailure} from './data.js';

const advertisementForm = document.querySelector('.ad-form');
const advertisementFormTitle = advertisementForm.querySelector('#title');
const advertisementFormAddress = advertisementForm.querySelector('#address');
const advertisementFormType = advertisementForm.querySelector('#type');
const advertisementFormPrice = advertisementForm.querySelector('#price');
const advertisementFormCheckin = advertisementForm.querySelector('#timein');
const advertisementFormCheckout = advertisementForm.querySelector('#timeout');
const advertisementFormRooms = advertisementForm.querySelector('#room_number');
const advertisementFormCapacity = advertisementForm.querySelector('#capacity');
const advertisementFormReset = advertisementForm.querySelector('.ad-form__reset');

const avatarChooser = advertisementForm.querySelector('#avatar');
const avatarPreview = advertisementForm.querySelector('.ad-form-header__preview img');

const housingImagesChooser = advertisementForm.querySelector('#images');
const housingImagesPreview = advertisementForm.querySelector('.ad-form__photo');

const typeConvertToPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const capacityOptions = Array.from(advertisementFormCapacity.options);

const disableAdvertisementForm = () => {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementForm.childNodes.forEach(disableDOMElement);
};

const enableAdvertisementForm = () => {
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementForm.childNodes.forEach(enableDOMElement);
  addAdvertisementFormCapacityItems(advertisementFormRooms.value);
};

const reloadPage = () => {
  advertisementForm.reset();
  mapForm.reset();
  map.setView(CENTER_COORDS, MAP_ZOOM);
  clearMarkers();
  getData(getDataSuccess, getDataFailure);
  positionMarker.setLatLng(CENTER_COORDS);
  advertisementFormAddress.value = `${CENTER_COORDS.lat.toFixed(FLOAT_LENGTH)}, ${CENTER_COORDS.lng.toFixed(FLOAT_LENGTH)}`;
  addAdvertisementFormCapacityItems(advertisementFormRooms.value);
  clearImages(avatarPreview);
  clearImages(housingImagesPreview);
};

advertisementFormTitle.addEventListener('input', () => {
  const titleLength = advertisementFormTitle.value.length;
  if (advertisementFormTitle.validity.tooShort) {
    advertisementFormTitle.setCustomValidity(`Длинна заголовка не менее 30 символов (${titleLength}/30)`);
  } else if (advertisementFormTitle.validity.tooLong) {
    advertisementFormTitle.setCustomValidity('Длинна заголовка не более 100 символов');
  } else if (advertisementFormTitle.validity.valueMissing) {
    advertisementFormTitle.setCustomValidity('Обязательное поле для заполнения!');
  } else {
    advertisementFormTitle.setCustomValidity('');
  }
  advertisementFormTitle.reportValidity();
});

advertisementFormType.addEventListener('change', () => {
  advertisementFormPrice.min = typeConvertToPrice[advertisementFormType.value];
  advertisementFormPrice.placeholder = typeConvertToPrice[advertisementFormType.value];
});

advertisementFormPrice.addEventListener('change', () => {
  if (advertisementFormPrice.validity.rangeUnderflow) {
    advertisementFormPrice.setCustomValidity(`Стоимость должна быть выше ${advertisementFormPrice.placeholder}`);
  } else if (advertisementFormPrice.validity.rangeOverflow) {
    advertisementFormPrice.setCustomValidity(`Стоимость должна быть ниже ${advertisementFormPrice.max}`);
  } else if (advertisementFormPrice.validity.valueMissing) {
    advertisementFormPrice.setCustomValidity('Обязательное поле для заполнения!');
  } else {
    advertisementFormPrice.setCustomValidity('');
  }
  advertisementFormPrice.reportValidity();
});

advertisementFormCheckin.addEventListener('change', () => {
  advertisementFormCheckout.value = advertisementFormCheckin.value;
});

advertisementFormCheckout.addEventListener('change', () => {
  advertisementFormCheckin.value = advertisementFormCheckout.value;
});

const addAdvertisementFormCapacityItems = (number) => {
  capacityOptions.forEach((item) => {
    item.hidden = !roomsToGuests[number].includes(item.value);
    item.selected = !item.hidden;
  })
};

advertisementFormRooms.addEventListener('change', () => {
  addAdvertisementFormCapacityItems(advertisementFormRooms.value);
});

advertisementFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  reloadPage();
});

const sendSuccess = () => {
  reloadPage();
  showSuccess();
};

const sendFail = () => {
  showError('Ошибка отправки формы!');
};

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    sendSuccess,
    sendFail,
    new FormData(evt.target),
  )
});

avatarChooser.addEventListener('change', () => {
  getImage(avatarChooser, avatarPreview);
});

housingImagesChooser.addEventListener('change', () => {
  getImage(housingImagesChooser, housingImagesPreview);
})

export {advertisementForm, advertisementFormAddress, disableAdvertisementForm, enableAdvertisementForm};
