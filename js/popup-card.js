const typeTranslateEngToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const mapCanvas = document.querySelector('.map__canvas');
const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const checkGuests = (col) => {
  if (col === 1) {
    return `${col} гостя`;
  } else {
    return `${col} гостей`;
  }
};

const checkRooms = (col) => {
  if (col === 1) {
    return `${col} комната`;
  } else if (col >= 5) {
    return `${col} комнат`;
  } else {
    return `${col} комнаты`;
  }
};

const addFeatures = (nodeFeatures, features) => {
  nodeFeatures.innerHTML = '';
  features.forEach((item) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature',`popup__feature--${item}`);
    nodeFeatures.appendChild(featureElement);
  });
};

const addPhotos = (nodePhotos, photos) => {
  nodePhotos.innerHTML = '';
  photos.forEach((item, index) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = `Фотография жилья ${index}`;
    photoElement.src = `${item}`;
    nodePhotos.appendChild(photoElement);
  });
};

const hideElement = (element) => {
  element.style.display = 'none';
};

const createAdvertisement = (advertisement) => {
  const newAdvertisement = advertisementTemplate.cloneNode(true);
  const nodeAvatar = newAdvertisement.querySelector('.popup__avatar');
  const nodeTitle = newAdvertisement.querySelector('.popup__title');
  const nodeAddress = newAdvertisement.querySelector('.popup__text--address');
  const nodePrice = newAdvertisement.querySelector('.popup__text--price');
  const nodeType = newAdvertisement.querySelector('.popup__type');
  const nodeCapacity = newAdvertisement.querySelector('.popup__text--capacity');
  const nodeTime = newAdvertisement.querySelector('.popup__text--time');
  const nodeFeatures = newAdvertisement.querySelector('.popup__features');
  const nodeDescriptions = newAdvertisement.querySelector('.popup__description');
  const nodePhotos = newAdvertisement.querySelector('.popup__photos');

  const {
    author: {
      avatar,
    },
    offer: {
      address,
      checkin,
      checkout,
      descriptions,
      features,
      guests,
      photos,
      price,
      rooms,
      title,
      type,
    },
  } = advertisement;
  title ? nodeTitle.textContent = title : hideElement(nodeTitle);
  address ? nodeAddress.textContent = address : hideElement(nodeAddress);
  price ? nodePrice.innerHTML = `${price} <span>₽/ночь</span>` : hideElement(nodePrice);
  type ? nodeType.textContent = typeTranslateEngToRus[type] : hideElement(type);
  if (!rooms && !guests) {
    hideElement(nodeCapacity);
  } else if (!rooms) {
    nodeCapacity.textContent = `Для ${checkGuests(guests)}`;
  } else if (!guests) {
    nodeCapacity.textContent = `${checkRooms(rooms)}`;
  } else {
    nodeCapacity.textContent = `${checkRooms(rooms)} для ${checkGuests(guests)}`;
  }
  if (!checkin && !checkout) {
    hideElement(nodeTime);
  } else {
    nodeTime.textContent = `Заезд после ${checkin} выезд до ${checkout}`;
  }
  features ? addFeatures(nodeFeatures, features) : hideElement(nodeFeatures);
  descriptions ? nodeDescriptions.textContent = descriptions : hideElement(nodeDescriptions);
  photos ? addPhotos(nodePhotos, photos) : hideElement(nodePhotos);
  avatar ? nodeAvatar.src = avatar : hideElement(nodeAvatar);

  mapCanvas.appendChild(newAdvertisement);
}

export {createAdvertisement};
