import {advertisementFormAddress} from './form.js';
import {advertisements, FLOAT_LENGTH} from './data.js';
import {createAdvertisement} from './popup-card.js';

const ICON = {
  SIZE: [40, 40],
  ANCHOR: [20,40],
}

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
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
});

const advertisementIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
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
  advertisementFormAddress.value = `${evt.target.getLatLng().lat.toFixed(FLOAT_LENGTH)}, ${evt.target.getLatLng().lng.toFixed(FLOAT_LENGTH)}`;
});

advertisements.forEach((item) => {
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
