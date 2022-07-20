"use strict"

window.onload = () => {
  const map = initMap('mapid');
  pan(map);

  const panButtonElem = document.querySelector('button[name="pan"]');
  panButtonElem.addEventListener("click", event => {
    pan(map);
  })

  const markButtonElem = document.querySelector('button[name="mark"]');
  markButtonElem.addEventListener("click", event => {
    mark(map);
  })

  const connect_websocket = () => {
    const ws = new WebSocket("ws://" + window.location.host + "/get_coordinate");

    ws.onopen = () => console.log("connection opened.");
    ws.onclose = () => console.log("connection closed.");

    ws.onmessage = m => {
      console.log(m);
      const coordinateStr = m.data.split(",");

      const latitudeElem = document.querySelector('input[name="latitude"]');
      const longitudeElem = document.querySelector('input[name="longitude"]');

      latitudeElem.value = parseFloat(coordinateStr[0]);
      longitudeElem.value = parseFloat(coordinateStr[1]);

      mark(map);
      pan(map);
    }
  }

  connect_websocket();
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

const mark = (map) => {
  const [lat, lng] = getPlace();
  map.addIcon(lat, lng, "a", "/walking.png", 16, 16);
}
