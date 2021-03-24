const DEFAULT_TYPE = 'any';

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

const isPriceInRange = (price, filterValue) => {
  return (price >= priceFilterValueToRange[filterValue].min && price < priceFilterValueToRange[filterValue].max)
}

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

const checkFeaturesFilter = (item) => {
  let features = Array.from(mapForm.querySelectorAll('input[type=checkbox]:checked'));
  if (!features.length) {
    return true;
  }

  return features.every((el) => item.offer.features.includes(el.value));
}

const checkFilters = (item) => {
  const isTypeCheck = checkFilter(item,  'type', typeFilter.value);
  const isRoomsCheck = checkFilter(item, 'rooms', roomsFilter.value);
  const isGuestsCheck = checkFilter(item, 'guests', guestsFilter.value);
  const isPriceCheck = checkPriceFilter(item, priceFilter.value);
  const isFeaturesCheck = checkFeaturesFilter(item);
  return isTypeCheck && isRoomsCheck && isGuestsCheck && isPriceCheck && isFeaturesCheck;
};

const useFilter = (advertisements) => {
  return advertisements.filter(checkFilters);
}

export {useFilter};
