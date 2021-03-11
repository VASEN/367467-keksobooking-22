import {mapFormDisable} from './map-form.js';
import {showError} from './error.js';

const URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  if (!response.ok) {
    const {statusText, status} = response;
    throw new Error(`${status} - ${statusText}`);
  } else {
    return response;
  }
}

const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then(checkStatus)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFail);
};

const getDataFailure = () => {
  mapFormDisable();
  showError('Не удалось загрузить предложения!');
}

const sendData = (onSuccess, onFail, body) => {
  fetch(`${URL}`, {method: 'POST', body})
    .then(checkStatus)
    .then(onSuccess)
    .catch(onFail);
};

export {getData, sendData, getDataFailure};
