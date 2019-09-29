import React, { forwardRef, ReactNode, Fragment } from 'react';

type Props = { children?: ReactNode };
type Ref = React.Ref<HTMLInputElement>;

const MapWrapper = forwardRef((props: Props, ref: Ref) => (
  <Fragment>
    <input
      ref={ref}
      className="search-box-controls"
      type="text"
      placeholder="Search Box"
      style={{
        visibility: 'hidden',
        position: 'absolute'
      }} 
    />
    <div id="map"></div>
  </Fragment>
));

export default MapWrapper;
