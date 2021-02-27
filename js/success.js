import {pageContent} from './form.js';
import {isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const closeSuccessMessage = () => {
  pageContent.querySelector('.success').removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('onkeydown', onSuccessMessageEscKeydown);
  pageContent.removeChild(pageContent.querySelector('.success'));
}

const showSuccess = () => {
  pageContent.appendChild(successTemplate);

  pageContent.querySelector('.success').addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);
}

export {showSuccess};
