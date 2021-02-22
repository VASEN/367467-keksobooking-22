import {advertisementFormAddress} from './form.js';
import {advertisements} from './data.js';
import {createAdvertisement} from './popup-card.js';

const mapForm = document.querySelector('.map__filters');

const map = L.map('map-canvas')
  .setView({
    lat: 35.685,
    lng: 139.7514,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});
const advertisementIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20,40],
});

const positionMarker = L.marker(
  [35.685, 139.7514],
  {
    icon: mainIcon,
    draggable: true,
  },
);

positionMarker.addTo(map);

positionMarker.on('move', (evt) => {
  advertisementFormAddress.value = Object.values(evt.target.getLatLng())
    .map(item => item.toFixed(5))
    .join(', ');
});

advertisements.forEach((item) => {
  console.log(item);
  const advertisementMarker = L.marker(
    [item.location.x, item.location.y],
    {
      icon: advertisementIcon,
    },
  );
  advertisementMarker
    .addTo(map)
    .bindPopup(createAdvertisement(item));
})

export {mapForm, map};
