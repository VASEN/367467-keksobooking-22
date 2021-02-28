import {isEscEvent} from './util.js';

const pageContent = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessage = successTemplate.cloneNode(true);


const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const closeSuccessMessage = () => {
  newSuccessMessage.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('onkeydown', onSuccessMessageEscKeydown);
  pageContent.removeChild(pageContent.querySelector('.success'));
}

const showSuccess = (message) => {
  newSuccessMessage.querySelector('.success__message').textContent = message;
  newSuccessMessage.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);

  pageContent.appendChild(successTemplate);

}

export {showSuccess};
