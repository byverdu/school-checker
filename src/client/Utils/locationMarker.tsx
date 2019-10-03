import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { EnumOfstedRatingColouring } from 'Models/Enums';
import SvgIcon from 'Components/SvgIcon';
import customMarkerWrapper from './customMarkerWrapper';

export function createLocationMarker(
  map: google.maps.Map,
  markers: google.maps.Marker[],
  searchBox: google.maps.places.SearchBox
) {

  const svg = ReactDOMServer.renderToString(
    <SvgIcon
      type="location"
      color={EnumOfstedRatingColouring.Inadequate}
    />
  );

  searchBox.addListener('places_changed', function() {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    // const bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      const marker = customMarkerWrapper({
        id: 'location',
        map: map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg),
          scaledSize: new google.maps.Size(50, 50)
        },
        title: place.name,
        position: place.geometry.location
      });
      
      google.maps.event.addListener(marker, 'click', () => marker.setMap(null));
      // Create a marker for each place.
      // we should not be adding items to a state prop 😡
      markers.push(marker);
    });
  });
}
