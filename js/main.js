import './form.js';
import {createPopup, map} from './map.js';
import {
  showAlert, pageDeactivate, pageActivate
} from './util.js';
import {getData} from './server-data.js';

try {
  if (map) {
    pageActivate();
    getData((item) => createPopup(item), (message) => showAlert(message));
  }
}
catch (error) {
  pageDeactivate();
}






