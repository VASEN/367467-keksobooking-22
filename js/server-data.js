const URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const {statusText, status} = response;
  throw new Error(`${status} - ${statusText}`);
}

const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then(checkStatus)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFail);
};

const sendData = (onSuccess, onFail, method, body) => {
  fetch(`${URL}`, {method, body})
    .then(checkStatus)
    .then(onSuccess)
    .catch(onFail);
};

export {getData, sendData};
