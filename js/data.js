import {getRandomRangeInt, getRandomRangeFloat} from './util.js';

const FLOAT_LENGTH = 5;
const ADVERTISEMENT_COL = 10;
const AVATAR = {
  PATH: 'img/avatars/user0',
  FILE_TYPE: '.png',
  START: 1,
  END: 8,
};
const OFFER = {
  TITLE: ['Просторная квартира', 'Лучшее предложение', 'Проведите Новый год в гостях у Деда Мороза', 'Экоусадьба на берегу озера', 'Дом у реки', 'Сказака в лесу'],
  PRICE: {start: 1000, end: 10000},
  TYPE: ['palace', 'flat', 'house', 'bungalow'],
  ROOMS: {start: 1, end: 5},
  GUESTS: {start: 1, end: 20},
  CHECK_IN: ['12:00', '13:00', '14:00'],
  CHECK_OUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTION: ['Просторный номер с двумя большими кроватями', 'Номер с видом на Москва реку.', 'Отличный дом для семейного отдыха на выходных', 'Номер с кроватью king-size и потрясающим завтраком'],
  PHOTO: {photoPath: 'http://o0.github.io/assets/images/tokyo/hotel', photoFileType: '.jpg'},
};
const LOCATION = {
  START_X: 35.65000,
  END_X: 35.70000,
  START_Y: 139.70000,
  END_Y: 139.80000,
  getLocation: function () {
    return {
      x: getRandomRangeFloat(this.START_X, this.END_X, FLOAT_LENGTH),
      y: getRandomRangeFloat(this.START_Y, this.END_Y, FLOAT_LENGTH),
    }
  },
};

const createAuthor = () => {
  return {
    avatar: AVATAR.PATH + getRandomRangeInt(AVATAR.START, AVATAR.END) + AVATAR.FILE_TYPE,
  }
};

const getNewFeatures = () => {
  let newFeaturesLength = getRandomRangeInt(1, OFFER.FEATURES.length);
  let features = [];
  while (features.length !== newFeaturesLength) {
    const item = OFFER.FEATURES[getRandomRangeInt(0, OFFER.FEATURES.length - 1)];
    if (!features.some(features => features === item)) {
      features.push(item);
    }
  }
  return features;
};

const getPhotoArray = () => {
  let photoQuantity = getRandomRangeInt(0, 10);
  let photoArray = new Array(photoQuantity);
  for (let i = 0; i <= photoArray.length - 1; i++) {
    photoArray[i] = OFFER.PHOTO.photoPath + (i + 1) + OFFER.PHOTO.photoFileType;
  }
  return photoArray;
};

const getOffer = (location) => {
  return {
    title: OFFER.TITLE[getRandomRangeInt(0, OFFER.TITLE.length - 1)],
    address: [location.x, location.y].join(', '),
    price: getRandomRangeInt(OFFER.PRICE.start, OFFER.PRICE.end),
    type: OFFER.TYPE[getRandomRangeInt(0, OFFER.TYPE.length - 1)],
    rooms: getRandomRangeInt(OFFER.ROOMS.start, OFFER.ROOMS.end),
    guests: getRandomRangeInt(OFFER.GUESTS.start, OFFER.GUESTS.end),
    checkin: OFFER.CHECK_IN[getRandomRangeInt(0, OFFER.CHECK_IN.length - 1)],
    checkout: OFFER.CHECK_OUT[getRandomRangeInt(0, OFFER.CHECK_OUT.length - 1)],
    features: getNewFeatures(),
    descriptions: OFFER.DESCRIPTION[getRandomRangeInt(0, OFFER.DESCRIPTION.length -1)],
    photos: getPhotoArray(),
  }
};

let advertisements = new Array(ADVERTISEMENT_COL).fill(null).map(() => {
  let currentLocation = LOCATION.getLocation();
  return {
    author: createAuthor(),
    offer: getOffer(currentLocation),
    location: currentLocation,
  }
});

export {advertisements, FLOAT_LENGTH};
