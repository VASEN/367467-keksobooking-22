import {clearMarkers} from './map.js';

const mapForm = document.querySelector('.map__filters');

const mapFormFeaturesFilter = mapForm.querySelector('#housing-features');
const mapFormFeaturesFilterItems = mapFormFeaturesFilter.querySelectorAll('.map__checkbox');

const setFilterForm = (cb) => {
  // console.log(mapForm.children);
  mapForm.addEventListener('change', (evt) => {
    clearMarkers();
    let currentValue = evt.target.value;
    let currentFilter = evt.target.id.split('-').splice(1, 1);
    cb(currentValue, currentFilter);
  });
}

mapFormFeaturesFilter.addEventListener('click', () => {
  let result = [];
  mapFormFeaturesFilterItems.forEach((item) => {
    if (item.checked) {
      result.push(item.value);
    }
  })
});

export {setFilterForm};
