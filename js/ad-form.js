import {sendData} from './server-data.js';
import {disableDOMElement, enableDOMElement, FLOAT_LENGTH} from './util.js';
import {showError} from './error.js';
import {showSuccess} from './success.js';
import {CENTER_COORDS, map, MAP_ZOOM, positionMarker} from './map.js';
import {mapForm} from './map-form.js';

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

const methodFormSubmit = 'POST';

const typeConvertToPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

const valueGuestsToString = {
  1: 'для 1 гостя',
  2: 'для 2 гостей',
  3: 'для 3 гостей',
  0: 'не для гостей',
}

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
  positionMarker.setLatLng(CENTER_COORDS);
  advertisementFormAddress.value = `${CENTER_COORDS.lat.toFixed(FLOAT_LENGTH)}, ${CENTER_COORDS.lng.toFixed(FLOAT_LENGTH)}`;
  addAdvertisementFormCapacityItems(advertisementFormRooms.value);
};

advertisementFormTitle.addEventListener('input', () => {
  const titleLength = advertisementFormTitle.value.length;
  if (advertisementFormTitle.validity.tooShort) {
    advertisementFormTitle.setCustomValidity(`Длинна заголовка не менее 30 символов (${titleLength}/30)`);
  } else if (advertisementFormTitle.validity.tooLong) {
    advertisementFormTitle.setCustomValidity('Длинна заголовка не более 100 символов');
  } else {
    advertisementFormTitle.setCustomValidity('');
  }
  advertisementFormTitle.reportValidity();
});

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

const clearAdvertisementFormCapacity = () => {
  for (let i = advertisementFormCapacity.childNodes.length -1; i >= 0; i--) {
    const child = advertisementFormCapacity.childNodes[i];
    child.remove();
  }
}

const addAdvertisementFormCapacityItems = (number) => {
  clearAdvertisementFormCapacity();
  let items = [];
  Object.entries(valueGuestsToString).map(([key, value]) => {
    const element = document.createElement('option');
    element.value = key;
    element.textContent = value;
    items.push(element);
  });
  if (number === '100') {
    advertisementFormCapacity.appendChild(items[0]);
  } else {
    for (let i = 1; i <= number; i++) {
      advertisementFormCapacity.appendChild(items[i]);
    }
  }
};

advertisementFormRooms.addEventListener('change', () => {
  addAdvertisementFormCapacityItems(advertisementFormRooms.value);
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
    () => showError('Ошибка отправки формы!'),
    methodFormSubmit,
    new FormData(evt.target),
  )
});

export {advertisementForm, advertisementFormAddress, disableAdvertisementForm, enableAdvertisementForm};
