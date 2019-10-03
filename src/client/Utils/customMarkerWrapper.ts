import { MarkerType, CustomMarkerOpts } from "Models/Enums";

const customMarkerWrapper = ({ Marker = google.maps.Marker,  ...args }) => {
  class CustomMarker extends Marker {
    id: MarkerType;
    constructor(options: CustomMarkerOpts) {
      super(options);
    }
  }

  return new CustomMarker({...args});
};

export default customMarkerWrapper;