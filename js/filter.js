const DEFAULT_TYPE = 'any';
const DEFAULT_ROOMS = 'any';
const DEFAULT_GUESTS = 'any';
const DEFAULT_PRICE = 'any';

const priceFilterValueToRange = {
  low: {min: 0, max: 10000},
  middle: {min: 10000, max: 50000},
  high: {min: 50000, max: 1000000},
}

const mapForm = document.querySelector('.map__filters');

const typeFilter = mapForm.querySelector('#housing-type');
const priceFilter = mapForm.querySelector('#housing-price');
const roomsFilter = mapForm.querySelector('#housing-rooms');
const guestsFilter = mapForm.querySelector('#housing-guests');
const featuresFilter = mapForm.querySelectorAll('.map__checkbox');

const checkFilters = (item) => {
  let type = typeFilter.value;
  let price = priceFilter.value;
  let rooms = roomsFilter.value;
  let guests = guestsFilter.value;
  let features = [];
  featuresFilter.forEach((item) => {
    if (item.checked === true) {
      features.push(item.value);
    }
  });
  let isTypeCheck = checkTypeFilter(item, type);
  let isRoomsCheck = checkRoomsFilter(item, rooms);
  let isGuestsCheck = checkGuestsFilter(item, guests);
  let isPriceCheck = checkPriceFilter(item, price);
  let isFeaturesCheck = checkFeaturesFilter(item, features);
  return isTypeCheck && isRoomsCheck && isGuestsCheck && isPriceCheck && isFeaturesCheck;
};

const checkTypeFilter = (item, filterValue) => {
  if (filterValue === DEFAULT_TYPE) {
    return true;
  }
  return item.offer.type.toString() === (filterValue || DEFAULT_TYPE);
}

const checkRoomsFilter = (item, filterValue) => {
  if (filterValue === DEFAULT_ROOMS) {
    return true;
  }
  return item.offer.rooms.toString() === (filterValue || DEFAULT_ROOMS);
}

const checkGuestsFilter = (item, filterValue) => {
  if (filterValue === DEFAULT_GUESTS) {
    return true;
  }
  return item.offer.guests.toString() === (filterValue || DEFAULT_GUESTS);
}

const checkPriceFilter = (item, filterValue) => {
  if (filterValue === DEFAULT_PRICE) {
    return true;
  }
  return (item.offer.price >= priceFilterValueToRange[filterValue].min && item.offer.price < priceFilterValueToRange[filterValue].max)
}

const checkFeaturesFilter = (item, filterValue) => {
  if (filterValue.length === 0) {
    return true;
  }

  let isCheckFeaturesFilterSuccess;
  for (let j = 0; j < filterValue.length; j++) {
    if (item.offer.features.includes(filterValue[j])) {
      isCheckFeaturesFilterSuccess = true;
    } else {
      isCheckFeaturesFilterSuccess = false;
      break;
    }
  }
  return isCheckFeaturesFilterSuccess;
}

export {checkFilters};
