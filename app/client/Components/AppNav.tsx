import React, { Fragment , SFC } from 'react';
import FilterCheckBoxes from 'Components/FilterCheckboxes';
import MapLegends from 'Components/MapLegends';
import SchoolsList from 'Components/SchoolsList';
import FlatsForm from 'Components/FlatsForm';
import { School } from 'Models/School';

interface AppNavProps {
  schools: School[],
  filters: any[],
  prevLocation: string,
  onFormSubmit: (e) => void
}

const AppNav: SFC<AppNavProps> = ({ schools, filters, prevLocation, onFormSubmit }) => (
  <Fragment>
    <FlatsForm onSubmit={onFormSubmit} />
    <details>
      <summary>Primary Schools Details</summary>
      <SchoolsList
        schools={schools}
        activeId={prevLocation.split('/').pop()}
      />
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
