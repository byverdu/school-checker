import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { School } from 'Models/School';
import { EnumOfstedRatingColouring } from 'Models/Enums';
import InfoWindow from 'Components/InfoWindow';
import SvgIcon from 'Components/SvgIcon';
import customMarkerWrapper from './customMarkerWrapper';

export function createSchoolMarker(
  map: google.maps.Map,
  school: School
) {

  const element = ReactDOMServer.renderToString(<InfoWindow school={school} />)

  const infowindow = new google.maps.InfoWindow();

  const svg = ReactDOMServer.renderToString(
    <SvgIcon
      type="school"
      color={EnumOfstedRatingColouring[school.ofstedRating]}
    />
  );

  const marker = customMarkerWrapper({
    id: 'school',
    position: new google.maps.LatLng(school.lat, school.lng),
    map: map,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg),
      scaledSize: new google.maps.Size(50, 50)
    },
    title: school.name
  });
  let cityCircle;

  google.maps.event.addListener(marker, 'mouseover', function () {
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
  });

  google.maps.event.addListener(marker, 'mouseout', function () {
    cityCircle.setMap(null);
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(element);
    infowindow.open(map, marker);
  });

  return marker;
}
