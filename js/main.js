'use strict';

// const RANGE_START = 0;
// const RANGE_END = 1;
const FLOAT_LENGTH = 5;

const getRandomRangeInt = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
  }
  throw new Error('Неверно задан диапазон!');
}

const getRandomRangeFloat = function (start, end, length = 2) {
  if (start > end) {
    [start, end] = [end, start];
  }
  if (start >= 0 && end >= 0 && start !== end) {
    return (Math.random() * (end - start) + start).toFixed(length);
  }
  throw new Error('Неверно задан диапазон!');
}

// getRandomRangeInt(RANGE_START, RANGE_END);
// getRandomRangeFloat(RANGE_START, RANGE_END, FLOAT_LENGTH);

const ADVERTISEMENT_COL = 10;

const avatarFullPath = {
  avatarPath: 'img/avatars/user',
  avatarFileType: '.png',
  avatarSuffix: 0,
};
const {avatarPath, avatarFileType, avatarSuffix} = avatarFullPath;
const avatarPathRange = {
  avatarPathStart: 1,
  avatarPathEnd: 8,
}
const {avatarPathStart, avatarPathEnd} = avatarPathRange;

const createAuthor = () => {
  return {
    avatar: avatarPath + avatarSuffix + getRandomRangeInt(avatarPathStart, avatarPathEnd) + avatarFileType,
  }
}

const OFFER_TITLE = 'Ваше объявление';

const locationCoords = {
  startX: 35.65000,
  endX: 35.70000,
  startY: 139.70000,
  endY: 139.80000,
  getLocation: function () {
    return {
      x: getRandomRangeFloat(this.startX, this.endX, FLOAT_LENGTH),
      y: getRandomRangeFloat(this.startY, this.endY, FLOAT_LENGTH),
    }
  },
}

const roomType = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const priceRange = {
  start: 1000,
  end: 10000,
};
const roomNumberRange = {
  start: 1,
  end: 5,
};
const guestsRange = {
  start: 1,
  end: 20,
};
const checkIn = [
  '12:00',
  '13:00',
  '14:00',
];
const checkOut = [
  '12:00',
  '13:00',
  '14:00',
];

const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const getNewFeatures = () => {
  const NEW_FEATURES_LENGTH = getRandomRangeInt(1, featuresList.length);
  const features = [];
  while (features.length !== NEW_FEATURES_LENGTH) {
    const item = featuresList[getRandomRangeInt(0, featuresList.length - 1)];
    if (!features.some(features => features === item)) {
      features.push(item);
    }
  }
  return features;
}

const descriptionsList = [
  'Просторный номер с двумя большими кроватями',
  'Номер с видом на Москва реку.',
  'Отличный дом для семейного отдыха на выходных',
  'Номер с кроватью king-size и потрясающим завтраком',
];

const photoAddress = {
  photoPath: 'http://o0.github.io/assets/images/tokyo/hotel',
  photoFileType: '.jpg',
}

const {photoPath, photoFileType} = photoAddress;

const createPhotoAddress = (index) => {
  return photoPath + index + photoFileType;
}

const getPhotoArray = () => {
  const photoQuantity = getRandomRangeInt(0, 10);
  const photoArray = new Array(photoQuantity);
  for (let i = 0; i <= photoArray.length - 1; i++) {
    photoArray[i] = createPhotoAddress(i + 1);
  }
  return photoArray;
}

const getOffer = () => {
  return {
    title: OFFER_TITLE,
    address: locationCoords.getLocation().x + ' ' + locationCoords.getLocation().y,
    price: getRandomRangeInt(priceRange.start, priceRange.end),
    type: roomType[getRandomRangeInt(0, roomType.length - 1)],
    rooms: getRandomRangeInt(roomNumberRange.start, roomNumberRange.end),
    guests: getRandomRangeInt(guestsRange.start, guestsRange.end),
    checkin: checkIn[getRandomRangeInt(0, checkIn.length - 1)],
    checkout: checkOut[getRandomRangeInt(0, checkOut.length - 1)],
    features: getNewFeatures(),
    descriptions: descriptionsList[getRandomRangeInt(0, descriptionsList.length -1)],
    photos: getPhotoArray(),
  }
}

const advertisements = new Array(ADVERTISEMENT_COL).fill(null).map(() => {
  return {
    author: createAuthor(),
    offer: getOffer(),
    location: locationCoords.getLocation(),
  }
});
