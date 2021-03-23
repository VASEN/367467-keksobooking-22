const URL = 'https://22.javascript.pages.academy/keksobooking';
const Method = {
  GET: 'GET',
  POST: 'POST',
}

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

const sendData = (onSuccess, onFail, body) => {
  fetch(`${URL}`, {method: Method.POST, body})
    .then(checkStatus)
    .then(onSuccess)
    .catch(onFail);
};

export {getData, sendData};
