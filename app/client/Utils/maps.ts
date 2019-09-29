import { SchoolMaker, School } from 'Models/School';
import { createSchoolMarker } from 'UtilsUI/schoolMarker';
import { createLocationMarker } from 'UtilsUI/locationMarker';
import createSchoolPopup from 'UtilsUI/popup';

const paths = require('shared-data/polygon-data.json');

export function loadMapMarkers(
  schools: School[],
  map: google.maps.Map
): google.maps.Marker[] {

  return schools.map((school: School) => {
    const tempSchool = SchoolMaker.create(school);
    const marker = createSchoolMarker(map, tempSchool);
    createSchoolPopup({
      position: new google.maps.LatLng(school.lat, school.lng),
      textContent: school.name,
      map
    });

    return marker;
  });
}

export function mapInit (
  map: google.maps.Map,
  markers: google.maps.Marker[],
  inputSearchBox: HTMLInputElement
) {
  const searchBox = new google.maps.places.SearchBox(inputSearchBox);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearchBox);
  const wandsworthBoundariesLine = new google.maps.Polyline({
    path: paths,
    strokeColor: '#EF476F',
    strokeWeight: 4,
  });

  // Draw the polygon on the desired map instance
  wandsworthBoundariesLine.setMap(map);

  // Add location marker when search is done
  createLocationMarker(map, markers, searchBox);
}
