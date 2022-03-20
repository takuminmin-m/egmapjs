"use strict"

window.onload = () => {
  const map = initMap('mapid');
  pan(map);

  const panButtonElem = document.querySelector('button[name="pan"]');
  panButtonElem.addEventListener("click", event => {
    pan(map);
  })
}

const getPlace = () => {
  const latitudeElem = document.querySelector('input[name="latitude"]');
  const longitudeElem = document.querySelector('input[name="longitude"]');

  const latitude = latitudeElem.value;
  const longitude = longitudeElem.value;

  return [latitude, longitude];
}

const pan = (map) => {
  const place = getPlace();

  map.setZoom(32);
  map.panTo(place);
}
