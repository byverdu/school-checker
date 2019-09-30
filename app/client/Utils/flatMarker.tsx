import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Flat } from 'Models/Flat';
import { EnumOfstedRatingColouring } from 'Models/Enums';
import InfoWindow from 'Components/InfoWindow';
import SvgIcon from 'Components/SvgIcon';
import customMarkerWrapper from './customMarkerWrapper';

export function createFlatMarker(
  map: google.maps.Map,
  flat: Flat
) {

  // const element = ReactDOMServer.renderToString(<InfoWindow school={school} />)

  // var infowindow = new google.maps.InfoWindow();

  const svg = ReactDOMServer.renderToString(
    <SvgIcon
      type="flat"
      color={EnumOfstedRatingColouring.None}
    />
  );

  var marker = customMarkerWrapper({
    id: 'flat',
    position: new google.maps.LatLng(flat.latitude, flat.longitude),
    map: map,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg),
      scaledSize: new google.maps.Size(50, 50)
    },
    title: flat.title
  });
  // var cityCircle;

  // google.maps.event.addListener(marker, 'mouseover', function () {
  //   cityCircle = new google.maps.Circle({
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.35,
  //     map: map,
  //     center: new google.maps.LatLng(school.lat, school.lng),
  //     radius: school.furthestDistance
  //   });
  // });

  // google.maps.event.addListener(marker, 'mouseout', function () {
  //   cityCircle.setMap(null);
  // });

  // google.maps.event.addListener(marker, 'click', function () {
  //   infowindow.setContent(element);
  //   infowindow.open(map, marker);
  // });

  return marker;
}
