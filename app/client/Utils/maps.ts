import { SchoolMaker, School } from 'Models/School';
import { createSchoolMarker } from 'UtilsUI/marker';
import createSchoolPopup from 'UtilsUI/popup';

const paths = require('shared-data/polygon-data.json');

function loadMapMarkers(
  schools: School[],
  map: google.maps.Map,
  markers: google.maps.Marker[]
) {
  schools.forEach((school: School) => {
    const tempSchool = SchoolMaker.create(school);
    const marker = createSchoolMarker(map, tempSchool);
    createSchoolPopup({
      position: new google.maps.LatLng(school.lat, school.lng),
      textContent: school.name,
      map
    });

    markers.push(marker);
  });
}

export function schoolAppInitMap(schools: School[]) {
  const LatLng: google.maps.LatLng = new google.maps.LatLng(51.4372907, -0.2058498999999756);
  const zoomMap = 14;
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      center: LatLng,
      zoom: zoomMap
    }
  );

  const wandsworthBoundariesLine = new google.maps.Polyline({
    path: paths,
    strokeColor: '#EF476F',
    strokeWeight: 4,
  });

  // Draw the polygon on the desired map instance
  wandsworthBoundariesLine.setMap(map);

  let markers: google.maps.Marker[] = [];
  let filters: { key: string, value: string }[] = [];

  Array.from(document.querySelectorAll('.map-filters'))
    .forEach(filter => {
      filter.addEventListener('change', (e) => {
        const criteria = JSON.parse((e.target as HTMLInputElement).value);
        const addedFilter = filters.findIndex(item => item.value === criteria.value);

        if (addedFilter === -1) {
          filters.push(criteria);
        } else {
          filters.splice(addedFilter, 1);
        }

        // empty previous markers on the map
        for (let i = 0; i < markers.length; i += 1) {
          markers[i].setMap(null);
        }
        markers = [];
        try {

          // do a schools copy so we can filter them
          let result = [];
          function filtersCriteria(initialCount) {
            const iterationCount = filters.length;

            // stop recursion
            if (initialCount === iterationCount) {
              return;
            }

            const { key, value } = filters[initialCount];
            const filtered = schools.filter(item => {
              if (item[key] && item[key].includes(value)) {
                return item[key].includes(value);
              }
              return item[key] === value
            }); 
            result = [...result, ...filtered];

            initialCount += 1;
            return filtersCriteria(initialCount);
          }

          filtersCriteria(0);

          if (filters.length === 0) {
            result = [...schools];
          }

          loadMapMarkers(result, map, markers)
        } catch (e) {
          throw Error(e);
        } finally {
          // re-center the map
          map.setCenter(LatLng);
          map.setZoom(zoomMap);
          google.maps.event.trigger(map, 'idle');
        }
      });
    });

  document.getElementById('clear-filters').addEventListener('click', () => {

    // setting the markers to null prior we empty the Array
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    // Empty inner vars
    markers = [];
    filters = [];

    // Un check all the checkboxes
    document.querySelectorAll('.map-filters:checked').forEach(item => (item as HTMLInputElement).checked = false)

    // Center the map in Putney
    map.setCenter(LatLng);
    map.setZoom(zoomMap);

    // reload initial schools
    loadMapMarkers(schools, map, markers);

    // Trigger re-draw the markers and map
    google.maps.event.trigger(map, 'idle');
  });

  loadMapMarkers(schools, map, markers);
}