var targetPoint = new google.maps.LatLng(38.629424, -90.195382);
var map = loadMapWithMarker(targetPoint);

function getLocation() {
  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      displayLocation,
      displayError,
      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    );
  }
  else {
    alert("Geolocation is not supported by this browser");
  }
}

function loadMapWithMarker(latlng) {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: latlng,
    zoom: 11
  });
  new google.maps.Marker({
    position: latlng,
    map: map,
    title: "Second Street Office"
  });

  return map;
}

function displayLocation(position) {
  var userLocation, locationAccuracy, marker, circle;

  userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  locationAccuracy = position.coords.accuracy;

  marker = new google.maps.Marker({
    position: userLocation,
    map: map,
    title:"Your Location (within " + locationAccuracy + " meters"
  });

  circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: userLocation,
    radius: locationAccuracy
  });

  if (checkIfInRange(targetPoint, circle)) {
    document.getElementById('in-bounds').innerHTML = 'You could be at the specified location';
  }
  else {
    document.getElementById('in-bounds').innerHTML = 'You are not at the specified location';
  }
  document.getElementsByTagName('body')[0].removeChild(document.getElementById('get-location'));
}

function checkIfInRange(latLng, circle) {
  var bounds = circle.getBounds();
  return bounds.contains(latLng);
}

function displayError(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}