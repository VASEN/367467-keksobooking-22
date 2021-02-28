import {mapFormDisable} from './map-form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        mapFormDisable();
        return onFail('Не удалось загрузить предложения');
      }
    })
    .then((advertisements) => advertisements.forEach((item) => onSuccess(item)))
    .catch(() => onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail);
};

export {getData, sendData};
