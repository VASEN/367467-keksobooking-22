import {disableDOMElement, enableDOMElement} from './util.js';

const mapForm = document.querySelector('.map__filters');

const mapFormTypeFilter = mapForm.querySelector('#housing-type');
const mapFormPriceFilter = mapForm.querySelector('#housing-price');
const mapFormRoomsFilter = mapForm.querySelector('#housing-rooms');
const mapFormGuestsFilter = mapForm.querySelector('#housing-guests');
const mapFormFeaturesFilter = mapForm.querySelector('#housing-features');
const mapFormFeaturesFilterItems = mapFormFeaturesFilter.querySelectorAll('.map__checkbox');

const disableMapForm = () => {
  mapForm.classList.add('map__filters--disabled');
  mapForm.childNodes.forEach(disableDOMElement);
};

const enableMapForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapForm.childNodes.forEach(enableDOMElement);
};

const setFormTypeFilter = (cb) => {
  mapFormTypeFilter.addEventListener('change', () => {
    console.log(mapFormTypeFilter.value);
    cb(mapFormTypeFilter.value);
  });
}

mapFormPriceFilter.addEventListener('change', () => {
  console.log(mapFormPriceFilter.value);
});

mapFormRoomsFilter.addEventListener('change', () => {
  console.log(mapFormRoomsFilter.value);
});

mapFormGuestsFilter.addEventListener('change', () => {
  console.log(mapFormGuestsFilter.value);
});



mapFormFeaturesFilter.addEventListener('click', () => {
  let result = [];
  mapFormFeaturesFilterItems.forEach((item) => {
    if (item.checked) {
      result.push(item.value);
    }
  })
});

export {disableMapForm, enableMapForm, mapForm, setFormTypeFilter};
