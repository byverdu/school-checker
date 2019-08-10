import { SchoolMaker, School } from 'models';
const schoolsData = require('shared-data/schools-data.json');
import {createMarker} from 'utils/marker';

export function schoolAppInitMap () {
  var position;
  var map;
  var infowindow = new google.maps.InfoWindow();
  // var geodecoder
  map = new google.maps.Map(
    document.getElementById('map'),
    { center: new google.maps.LatLng(51.458509, -0.2058498999999756), zoom: 14 });

    function createMarker(school: School) {
      var contentString = school.name;
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(school.lat, school.lng),
        map: map
      });
      var cityCircle;
     google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: new google.maps.LatLng(school.lat, school.lng),
          radius: school.furthestDistance
        });
        google.maps.event.addListener(infowindow, 'closeclick', function() {
          cityCircle.setMap(null);
        });
      });


    //   bounds.extend(marker.position);
    }

    

    schoolsData.forEach((school: School) => {
      const tempSchool = SchoolMaker.create(school)
      createMarker(map, tempSchool);
    })
}