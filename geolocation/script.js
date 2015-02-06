function getLocation(){
  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      loadMap,
      displayError,
      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    );
  }
  else {
    alert("Geolocation is not supported by this browser");
  }
}

function loadMap(position) {
  var userLocation, locationAccuracy, map, marker, circle;

  userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  locationAccuracy = position.coords.accuracy;

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: userLocation,
    zoom: 11
  });

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
  document.getElementsByTagName('body')[0].removeChild(document.getElementById('get-location'));
}

function displayError(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}