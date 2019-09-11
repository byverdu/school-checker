import { School } from 'Models/School';
const schoolsData = require('shared-data/schools-data.json');

window.localStorage.setItem('geoLocations', JSON.stringify([]));

(window as any).initMap = () => {
  var position;
  var map;
  var delay = 100;
  var geo = new google.maps.Geocoder();
  var nextAddress = 0;
  // var geodecoder
  map = new google.maps.Map(
    document.getElementById('map'),
    { center: new google.maps.LatLng(51.458509, -0.2058498999999756), zoom: 16 });

  function getAddress(school: School, next) {
    geo.geocode({ address: school.postcode }, function (results, status) {
      // If that was successful
      if (status == google.maps.GeocoderStatus.OK) {
        // Lets assume that the first marker is the one we want
        const geoLocations = JSON.parse(window.localStorage.getItem('geoLocations'));

        geoLocations.push({
          name: school.name,
          id: school.id,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });

        window.localStorage.setItem('geoLocations', JSON.stringify(geoLocations));
      }
      // ====== Decode the error status ======
      else {
        // === if we were sending the requests to fast, try this one again and increase the delay
        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          nextAddress--;
          delay++;
          console.log('OVER_QUERY_LIMIT', localStorage)
        } else {
          const geoLocations = JSON.parse(window.localStorage.getItem('geoLocations'));

          geoLocations.push({
            name: school.name,
            id: school.id,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });

          window.localStorage.setItem('geoLocations', JSON.stringify(geoLocations));
        }
      }
      next();
    }
    );
  }

  function theNext() {
    if (nextAddress < schoolsData.length) {
      setTimeout(() => { getAddress(schoolsData[nextAddress], theNext) }, delay);
      nextAddress++;
    } else {
      console.log(localStorage)
    }
  }

  theNext();
}