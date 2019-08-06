import React, { Fragment } from 'react';
import { WindowMap } from 'models';
import { schoolAppInitMap } from 'utils/maps';

const App = () => {

  (window as WindowMap).schoolAppInitMap = schoolAppInitMap;

  return (
    <Fragment>
      <h1>Title App</h1>
      <div id="map"></div>
    </Fragment>
  )
}

export default App;