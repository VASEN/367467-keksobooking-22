import {map, showMarkerList} from './map.js';
import {getData} from './server-data.js';
import {activatePage, deactivatePage} from './page.js';
import {disableMapForm} from './map-form.js';
import {showError} from './error.js';
import {setFormTypeFilter} from './map-form.js';

const getDataSuccess = (advertisements) => {
  showMarkerList(advertisements);
  setFormTypeFilter((value) => {
    if (value === 'any') {
      showMarkerList(advertisements);
    } else {
      showMarkerList(advertisements
        .slice()
        .filter((item) => {return Object.values(item.offer).includes(value)}));
    }
  })
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
