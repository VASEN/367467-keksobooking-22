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
    .then((advertisements) => advertisements.forEach(item => onSuccess(item)))
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(`${URL}`, {method: 'POST', body})
    .then(checkStatus)
    .then(onSuccess)
    .catch(onFail);
};

export {getData, sendData};
