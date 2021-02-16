import {advertisements} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createAdvertisementList = () => {
  const listFragment = document.createDocumentFragment();
  for (let i = 0; i < advertisements.length; i++) {
    listFragment.appendChild(createAdvertisement(advertisements[i]));
  }
  return listFragment;
}

const showAdvertisement = (number) => {
  const list = createAdvertisementList();
  mapCanvas.appendChild(list.childNodes[number]);
}

const checkType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const checkGuests = (col) => {
  if (col === 1) {
    return `${col} гостя`;
  } else {
    return `${col} гостей`;
  }
}

const checkRooms = (col) => {
  if (col === 1) {
    return `${col} комната`;
  } else {
    return `${col} комнаты`;
  }
}

const checkFeature = (feature) => {
  const featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature');
  switch (feature) {
    case 'wifi':
      featureElement.classList.add('popup__feature--wifi');
      break;
    case 'dishwasher':
      featureElement.classList.add('popup__feature--dishwasher');
      break;
    case 'parking':
      featureElement.classList.add('popup__feature--parking');
      break;
    case 'washer':
      featureElement.classList.add('popup__feature--washer');
      break;
    case 'elevator':
      featureElement.classList.add('popup__feature--elevator');
      break;
    case 'conditioner':
      featureElement.classList.add('popup__feature--conditioner');
      break;
  }
  return featureElement;
}

const checkFeatures = (features) => {
  const featureFragment = document.createDocumentFragment();
  for (let i = 0; i < features.length; i++) {
    featureFragment.appendChild(checkFeature(features[i]));
  }
  return featureFragment;
}

const checkPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = `Фотография жилья ${i}`;
    photoElement.src = `${photos[i]}`;
    photoFragment.appendChild(photoElement);
  }
  return photoFragment;
}

const createAdvertisement = (advertisement) => {
  let newAdvertisement = advertisementTemplate.cloneNode(true);

  for (let key in advertisement.offer) {
    switch (key) {
      case 'title':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector(`.popup__${key}`).textContent = advertisement.offer[key];
        }
        break;
      case 'address':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__text--${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector(`.popup__text--${key}`).textContent = advertisement.offer[key];
        }
        break;
      case 'price':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__text--${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector(`.popup__text--${key}`).innerHTML = `${advertisement.offer[key]} <span>₽/ночь</span>`;
        }
        break;
      case 'type':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector(`.popup__${key}`).textContent = checkType(advertisement.offer[key]);
        }
        break;
      case 'rooms':
      case 'guests':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector('.popup__text--capacity').style.display = 'none';
        } else {
          newAdvertisement.querySelector('.popup__text--capacity').textContent = `${checkRooms(advertisement.offer.rooms)} для ${checkGuests(advertisement.offer.guests)}`;
        }
        break;
      case 'checkin':
      case 'checkout':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector('.popup__text--time').style.display = 'none';
        } else {
          newAdvertisement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin} выезд до ${advertisement.offer.checkout}`;
        }
        break;
      case 'features':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector('.popup__features').innerHTML = '';
          newAdvertisement.querySelector('.popup__features').appendChild(checkFeatures(advertisement.offer[key]));
        }
        break;
      case 'description':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector('.popup__description').textContent = advertisement.offer[key];
        }
        break;
      case 'photos':
        if (advertisement.offer[key] === '') {
          newAdvertisement.querySelector(`.popup__${key}`).style.display = 'none';
        } else {
          newAdvertisement.querySelector('.popup__features').innerHTML = '';
          newAdvertisement.querySelector('.popup__features').appendChild(checkPhotos(advertisement.offer[key]));
        }
        break;
    }
  }
  newAdvertisement.querySelector('.popup__avatar').src = advertisement.author.avatar;
  return newAdvertisement;
}

showAdvertisement(3);
