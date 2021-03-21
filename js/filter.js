const DEFAULT_TYPE = 'any';

const priceFilterValueToRange = {
  low: {min: 0, max: 10000},
  middle: {min: 10000, max: 50000},
  high: {min: 50000, max: 1000000},
}

const isPriceInRange = (price, filterValue) => {
  return (price >= priceFilterValueToRange[filterValue].min && price < priceFilterValueToRange[filterValue].max)
}

const mapForm = document.querySelector('.map__filters');

const typeFilter = mapForm.querySelector('#housing-type');
const priceFilter = mapForm.querySelector('#housing-price');
const roomsFilter = mapForm.querySelector('#housing-rooms');
const guestsFilter = mapForm.querySelector('#housing-guests');

const checkFilter = (item, filter, filterValue) => {
  if (filterValue === DEFAULT_TYPE) {
    return true;
  }
  return item.offer[filter].toString() === (filterValue || DEFAULT_TYPE);
}

const checkPriceFilter = (item, filterValue) => {
  if (filterValue === DEFAULT_TYPE) {
    return true;
  }
  return isPriceInRange(item.offer.price, filterValue);
}

const checkFeaturesFilter = (item, filterValue) => {
  if (filterValue.length === 0) {
    return true;
  }

  return filterValue.every((el) => item.offer.features.includes(el));
}

const checkFilters = (item) => {
  let type = typeFilter.id.split('-').splice(1,1);
  let price = priceFilter.value;
  let rooms = roomsFilter.id.split('-').splice(1,1);
  let guests = guestsFilter.id.split('-').splice(1,1);
  let features = Array.from(mapForm.querySelectorAll('input[type=checkbox]:checked')).map((item) => {
    return item.value;
  });
  let isTypeCheck = checkFilter(item, type, typeFilter.value);
  let isRoomsCheck = checkFilter(item, rooms, roomsFilter.value);
  let isGuestsCheck = checkFilter(item, guests, guestsFilter.value);
  let isPriceCheck = checkPriceFilter(item, price);
  let isFeaturesCheck = checkFeaturesFilter(item, features);
  return isTypeCheck && isRoomsCheck && isGuestsCheck && isPriceCheck && isFeaturesCheck;
};

const useFilter = (advertisements) => {
  return advertisements.filter((item) => checkFilters(item));
}

export {useFilter};
