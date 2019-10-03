import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Flat } from 'Models/Flat';
import FlatInfoWindow from 'Components/FlatInfoWindow';
import SvgIcon from 'Components/SvgIcon';
import customMarkerWrapper from './customMarkerWrapper';

export function createFlatMarker(
  map: google.maps.Map,
  flat: Flat
) {

  const element = ReactDOMServer.renderToString(<FlatInfoWindow flat={flat} />)

  var infowindow = new google.maps.InfoWindow();

  const svg = ReactDOMServer.renderToString(
    <SvgIcon
      type="flat"
      color={flat.flat_rating}
    />
  );

  var marker = customMarkerWrapper({
    id: 'flat',
    position: new google.maps.LatLng(flat.latitude, flat.longitude),
    map: map,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg),
      scaledSize: new google.maps.Size(30, 30)
    },
    title: flat.title
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(element);
    infowindow.open(map, marker);
  });

  return marker;
}
