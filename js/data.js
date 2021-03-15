import {map, showMarkerList} from './map.js';
import {getData, getDataFailure} from './server-data.js';
import {pageActivate, pageDeactivate} from './page.js';

if (map) {
  pageActivate();
  getData(showMarkerList, getDataFailure);
} else {
  pageDeactivate();
}
