import {isEscEvent} from './util.js';

const pageContent = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const closeErrorMessage = () => {
  document.body.style.overflow = 'visible';
  newError.removeEventListener('click', closeErrorMessage);
  pageContent.querySelector('.error__button').removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  pageContent.removeChild(pageContent.querySelector('.error'));
};

const showError = (message) => {
  document.body.style.overflow = 'hidden';
  newError.querySelector('.error__message').textContent = message;
  newError.addEventListener('click', closeErrorMessage);
  newError.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);

  pageContent.appendChild(newError);
};

export {showError};
