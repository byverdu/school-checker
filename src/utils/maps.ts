import { SchoolMaker, School } from 'models';
const schoolsData = require('shared-data/schools-data.json');
import {createMarker} from 'utils/marker';
import createSchoolPopup from 'utils/popup';

export function schoolAppInitMap () {
  var map = new google.maps.Map(
    document.getElementById('map'),
    { center: new google.maps.LatLng(51.458509, -0.2058498999999756), zoom: 14 }
  );

    schoolsData.forEach((school: School) => {
      const tempSchool = SchoolMaker.create(school)
      createMarker(map, tempSchool);
      createSchoolPopup({
        position: new google.maps.LatLng(school.lat, school.lng),
        textContent: school.name,
        map
      });
    })
}