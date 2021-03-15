import {map, showMarkerList} from './map.js';
import {getData} from './server-data.js';
import {activatePage, deactivatePage} from './page.js';
import {getDataFailure} from './map-form.js';

if (map) {
  activatePage();
  getData(showMarkerList, getDataFailure);
} else {
  deactivatePage();
}
