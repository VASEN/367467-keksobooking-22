import './form.js';
import {pageDeactivate, pageActivate} from './util.js';
import {createPopup, map} from './map.js';
import {getData} from './server-data.js';
import {showError} from './error.js';

try {
  if (map) {
    pageActivate();
    getData((item) => createPopup(item), (message) => showError(message));
  } else {
    pageDeactivate();
  }
}
catch (error) {
  pageDeactivate();
}
