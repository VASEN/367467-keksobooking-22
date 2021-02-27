import {pageContent} from './form.js';
import {isEscEvent} from './util.js';

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

const closeErrorMessage = () => {
  pageContent.querySelector('.error').removeEventListener('click', closeErrorMessage);
  pageContent.querySelector('.error__button').removeEventListener('click', closeErrorMessage);
  document.removeEventListener('onkeydown', onErrorMessageEscKeydown);
  pageContent.removeChild(pageContent.querySelector('.error'));
}

const showError = () => {
  pageContent.appendChild(errorTemplate);

  pageContent.querySelector('.error').addEventListener('click', closeErrorMessage);
  pageContent.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
}

export {showError};

