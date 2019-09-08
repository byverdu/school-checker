import React, { Fragment , SFC } from 'react';
import FilterCheckBoxes from 'Components/FilterCheckboxes';
import MapLegends from 'Components/MapLegends';
import SchoolsList from 'Components/SchoolsList';
import { School } from 'models';
import { Link } from 'react-router-dom';

const AppNav: SFC<{ schools: School[], filters: any[], prevLocation: string }> = ({ schools, filters, prevLocation }) => (
  <Fragment>
    <Link to="/">Home</Link>
    <details>
      <summary>Primary Schools</summary>
      <SchoolsList schools={schools} />
    </details>
    {prevLocation === '/' && (
      <Fragment>
        <details>
      <summary>Map Legends</summary>
      <MapLegends />
    </details>
    <details>
      <summary>Select Filters</summary>
      <div className="map-filters-wrapper">
        {
          filters.map((filter, index) => (
            <FilterCheckBoxes
              key={index}
              {...filter}
            />
          ))
        }
      </div>
      <button id="clear-filters">
        Clear All Filters
        </button>
    </details>
      </Fragment>  
    )}
    
  </Fragment>
);

export default AppNav;
