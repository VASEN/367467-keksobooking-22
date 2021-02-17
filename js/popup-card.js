const typeTranslateEngToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const mapCanvas = document.querySelector('.map__canvas');
const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const showAdvertisement = (number) => {
  mapCanvas.appendChild(createAdvertisement(number));
}

const checkType = (type) => {
  for (let key in typeTranslateEngToRus) {
    if (key === type) {
      return typeTranslateEngToRus[key];
    }
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
  } else if (col >= 5) {
    return `${col} комнат`;
  } else {
    return `${col} комнаты`;
  }
}

const checkFeature = (feature) => {
  const featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature');
  featureElement.classList.add(`popup__feature--${feature}`);

  return featureElement;
}

const checkFeatures = (features) => {
  // const featureFragment = document.createDocumentFragment();
  let featureFragment = [];
  for (let i = 0; i < features.length; i++) {
    featureFragment.push(checkFeature(features[i]));
  }
  console.log(featureFragment);
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
  if (advertisement.offer.title === '') {
    newAdvertisement.querySelector('.popup__title')
      .style.display = 'none';
  } else  {
    newAdvertisement.querySelector('.popup__title')
      .textContent = advertisement.offer.title;
  }
  if (advertisement.offer.address === '') {
    newAdvertisement.querySelector('.popup__text--address')
      .style.display = 'none';
  } else  {
    newAdvertisement.querySelector('.popup__text--address')
      .textContent = advertisement.offer.address;
  }
  if (advertisement.offer.price === '') {
    newAdvertisement.querySelector('.popup__text--price')
      .style.display = 'none';
  } else  {
    newAdvertisement.querySelector('.popup__text--price')
      .innerHTML = `${advertisement.offer.price} <span>₽/ночь</span>`;
  }
  if (advertisement.offer.type === '') {
    newAdvertisement.querySelector('.popup__type')
      .style.display = 'none';
  } else  {
    newAdvertisement.querySelector('.popup__type')
      .textContent = checkType(advertisement.offer.type);
  }
  if (advertisement.offer.rooms === '' && advertisement.offer.guests === '') {
    newAdvertisement.querySelector('.popup__text--capacity')
      .style.display = 'none';
  } else if (advertisement.offer.rooms === '') {
    newAdvertisement.querySelector('.popup__text--capacity')
      .textContent = `Для ${checkGuests(advertisement.offer.guests)}`;
  } else if (advertisement.offer.guests === '') {
    newAdvertisement.querySelector('.popup__text--capacity')
      .textContent = `${checkRooms(advertisement.offer.rooms)}`;
  } else {
    newAdvertisement.querySelector('.popup__text--capacity')
      .textContent = `${checkRooms(advertisement.offer.rooms)} для ${checkGuests(advertisement.offer.guests)}`;
  }
  if (advertisement.offer.checkin === '' && advertisement.offer.checkout === '') {
    newAdvertisement.querySelector('.popup__text--time')
      .style.display = 'none';
  } else {
    newAdvertisement.querySelector('.popup__text--time')
      .textContent = `Заезд после ${advertisement.offer.checkin} выезд до ${advertisement.offer.checkout}`;
  }
  if (advertisement.offer.features === '') {
    newAdvertisement.querySelector('.popup__features')
      .style.display = 'none';
  } else {
    newAdvertisement.querySelector('.popup__features')
      .innerHTML = '';
    newAdvertisement.querySelector('.popup__features')
      .append(...checkFeatures(advertisement.offer.features));
  }
  if (advertisement.offer.features === '') {
    newAdvertisement.querySelector('.popup__description')
      .style.display = 'none';
  } else {
    newAdvertisement.querySelector('.popup__description')
      .textContent = advertisement.offer.descriptions;
  }
  if (advertisement.offer.features === '') {
    newAdvertisement.querySelector('.popup__photos')
      .style.display = 'none';
  } else {
    newAdvertisement.querySelector('.popup__photos')
      .innerHTML = '';
    newAdvertisement.querySelector('.popup__photos')
      .appendChild(checkPhotos(advertisement.offer.photos));
  }
  if (advertisement.author.avatar === '') {
    newAdvertisement.querySelector('.popup__avatar')
      .style.display = 'none';
  } else {
    newAdvertisement.querySelector('.popup__avatar')
      .src = advertisement.author.avatar;
  }
  return newAdvertisement;
}

export {showAdvertisement};
