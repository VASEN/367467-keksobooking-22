const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return onFail('Не удалось загрузить предложения');
      }
    })
    .then((advertisements) => advertisements.forEach((item) => onSuccess(item)))
    .catch(() => onFail);
};

export {getData};
