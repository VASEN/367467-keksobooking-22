import {map, showMarkerList} from './map.js';
import {getData} from './server-data.js';
import {activatePage, deactivatePage} from './page.js';
import {disableMapForm} from './map-form.js';
import {showError} from './error.js';
import {setFilterForm} from './filter.js';

let filter = {
  // type: 'any',
  // price: 'any',
  // rooms: 'any',
  // guests: 'any',
};

const getDataSuccess = (advertisements) => {
  showMarkerList(advertisements);
  setFilterForm((currentValue, currentFilter) => {
    console.log(currentValue);
    if (currentValue === 'any') {
      delete filter[currentFilter];
    } else {
      filter[currentFilter] = currentValue;
    }
    console.log(filter);
    if (Object.keys(filter).length === 0) {
      showMarkerList(advertisements);
    } else {
      showMarkerList(advertisements
        .slice()
        .filter((item) => {
          let isAvailableItem;
          for (const itemKey in filter) {
            if (item.offer[itemKey].toString() === filter[itemKey]) {
              isAvailableItem = true;
            } else {
              isAvailableItem = false;
              break;
            }
          }
          if (isAvailableItem === true) {
            return item;
          }
        }));
    }

    // if (currentValue === 'any') {
    //   delete filter[currentFilter];
    //   console.log(filter);
    //   showMarkerList(advertisements);
    // } else {
    //   showMarkerList(advertisements
    //     .slice()
    //     .filter((item) => {
    //       if (item.offer[currentFilter].toString() === currentValue) {
    //         return item;
    //       }
    //     }));
    // }
  });
};

const getDataFailure = () => {
  disableMapForm();
  showError('Не удалось загрузить предложения!');
}

if (map) {
  activatePage();
  getData(getDataSuccess, getDataFailure);
} else {
  deactivatePage();
}
