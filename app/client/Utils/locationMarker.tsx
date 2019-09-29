import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { EnumOfstedRatingColouring } from 'Models/Enums';
import SvgIcon from 'Components/SvgIcon';

interface CustomMarkerOpts extends google.maps.MarkerOptions {
  id: number;
}

export function createLocationMarker(
  map: google.maps.Map,
  markers: google.maps.Marker[],
  searchBox: google.maps.places.SearchBox
) {

  class CustomMarker extends google.maps.Marker {
    id: number;
    constructor(options: CustomMarkerOpts) {
      super(options);
    }
  }

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

      const marker = new CustomMarker({
        id: 0,
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
