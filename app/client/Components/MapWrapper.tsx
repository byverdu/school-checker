import React, { forwardRef, ReactNode, Fragment } from 'react';

type Props = { children?: ReactNode }
type Ref = React.Ref<HTMLInputElement>;

const MapWrapper = forwardRef((props: Props, ref: Ref) => (
  <Fragment>
    <input ref={ref} className="controls" type="text" placeholder="Search Box"></input>
    <div id="map"></div>
  </Fragment>
));

export default MapWrapper;
