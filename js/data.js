/* global _:readonly */
import {map, showMarkerList} from './map.js';
import {getData} from './server-data.js';
import {activatePage, deactivatePage} from './page.js';
import {disableMapForm} from './map-form.js';
import {showError} from './error.js';
import {setFilterForm} from './map-form.js';

const CREATE_MARKERS_DELAY = 500;

const getDataSuccess = (advertisements) => {
  showMarkerList(advertisements);
  setFilterForm(_.debounce(() => (showMarkerList(advertisements))), CREATE_MARKERS_DELAY);
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
