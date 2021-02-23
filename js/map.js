import {advertisementFormAddress} from './form.js';
import {advertisements, FLOAT_LENGTH} from './data.js';
import {createAdvertisement} from './popup-card.js';

const ICON = {
  SIZE: [40, 40],
  ANCHOR: [20,40],
};

const CENTER_COORDS = {
  lat: 35.685,
  lng: 139.7514,
}

const MAP_ZOOM = 10;

const map = window.L.map('map-canvas')
  .setView(CENTER_COORDS, MAP_ZOOM);

window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = window.L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
});

const advertisementIcon = window.L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
});

const positionMarker = window.L.marker(
  CENTER_COORDS,
  {
    icon: mainIcon,
    draggable: true,
  },
);

positionMarker.addTo(map);

positionMarker.on('move', (evt) => {
  const currentLatLng = evt.target.getLatLng();
  advertisementFormAddress.value = `${currentLatLng.lat.toFixed(FLOAT_LENGTH)}, ${currentLatLng.lng.toFixed(FLOAT_LENGTH)}`;
});

advertisements.forEach((item) => {
  const advertisementMarker = window.L.marker(
    [item.location.x, item.location.y],
    {
      icon: advertisementIcon,
    },
  );
  advertisementMarker
    .addTo(map)
    .bindPopup(createAdvertisement(item));
})

export {map};
