import React, { Fragment } from 'react';
import { WindowMap } from 'models';
import { schoolAppInitMap } from 'utils/maps';
import FilterCheckBoxes from 'Components/FilterCheckboxes';
import MapLegends from 'Components/MapLegends';

const schoolsData = require('shared-data/schools-data.json');

import '../../static/styles.scss';

const filters = [
  {
    title:"Ofsted Rating",
    propToRender:"ofstedRating"
  },
  {
    title:"Type of School",
    propToRender:"type"
  },
  {
    title:"Reading Score",
    propToRender:"statsReading"
  },
  {
    title:"Writing Score",
    propToRender:"statsWriting"
  },
  {
    title:"Maths Score",
    propToRender:"statsMaths"
  },
  {
    title:"Religions",
    propToRender:"religion"
  },
  {
    title:"Pupils Ages",
    propToRender:"age"
  }
].map(item => ({
  ...item,
  schools: schoolsData
}));

const App = () => {
    
  (window as WindowMap).schoolAppInitMap = (function() {
    schoolAppInitMap(schoolsData);
  });  

  return (
    <section className="school-checker">
      <h1 className="map-title">School Checker</h1>
      <details>
        <summary>Map Legends</summary>
        <MapLegends />
      </details>
      <details>
        <summary>Select Filters</summary>
        <div className="map-filters-wrapper">
          {
            filters.map(filter => (
              <FilterCheckBoxes
                {...filter}
              />
            ))
          }
        </div>
        <button id="clear-filters">
          Clear All Filters
        </button>
      </details>
    
      <div id="map"></div>
    </section>
  )
}

export default App;