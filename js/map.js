import {createAdvertisement} from './popup-card.js';
import {FLOAT_LENGTH} from './util.js';

const ICON = {
  SIZE: [40, 40],
  ANCHOR: [20,40],
};
const CENTER_COORDS = {
  lat: 35.685,
  lng: 139.7514,
};
const MAP_ZOOM = 10;
const advertisementFormAddress = document.querySelector('#address');
const mapCanvas = document.querySelector('#map-canvas');
const map = window.L.map('map-canvas')
  .setView(CENTER_COORDS, MAP_ZOOM);

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

positionMarker.on('move', (evt) => {
  const currentLatLng = evt.target.getLatLng();
  advertisementFormAddress.value = `${currentLatLng.lat.toFixed(FLOAT_LENGTH)}, ${currentLatLng.lng.toFixed(FLOAT_LENGTH)}`;
});

const showMarkerList = (advertisements) => {
  advertisements.forEach((advertisement) => createMarker(advertisement));
}

const createMarker = (item) => {
  const advertisementMarker = window.L.marker(
    [item.location.lat, item.location.lng],
    {
      icon: advertisementIcon,
    },
  );
  advertisementMarker
    .addTo(map)
    .bindPopup(createAdvertisement(item));
};

export {map, showMarkerList, mapCanvas, positionMarker, CENTER_COORDS, MAP_ZOOM};
