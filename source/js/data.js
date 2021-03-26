/* global _:readonly */
import {clearMarkers, map, showMarkerList} from './map.js';
import {getData} from './server-data.js';
import {activatePage, deactivatePage} from './page.js';
import {disableMapForm} from './map-form.js';
import {showError} from './error.js';
import {setFilterForm} from './map-form.js';
import {useFilter} from './filter.js';

const CREATE_MARKERS_DELAY = 500;

const getDataSuccess = (advertisements) => {
  showMarkerList(advertisements);
  setFilterForm(_.debounce(() => {
    clearMarkers();
    showMarkerList(useFilter(advertisements));
  }, CREATE_MARKERS_DELAY));
};

const getDataFailure = () => {
  disableMapForm();
  showError('Не удалось загрузить данные с сервера!');
}

if (map.on('load')) {
  activatePage();
  getData(getDataSuccess, getDataFailure);
} else {
  deactivatePage();
}

export {getDataSuccess, getDataFailure}
