import React, { Fragment, SFC } from 'react';
import FilterCheckboxesNavDetails from 'Components/FilterCheckboxesNavDetails';
import MapLegendsNavDetails from 'Components/MapLegendsNavDetails';
import SchoolsListNavDetails from 'Components/SchoolsListNavDetails';
import SearchFlatsNavDetails from 'Components/SearchFlatsNavDetails';
import { School } from 'Models/School';
import { ROOT_URL } from 'config';

interface AppNavProps {
  schools: School[],
  newLocation: string,
  onFormSubmit: (e) => void
}

const AppNav: SFC<AppNavProps> = ({ schools, newLocation, onFormSubmit }) => (
  <Fragment>
    <SchoolsListNavDetails
      schools={schools}
      activeId={newLocation.split('/').pop()}
    />
    {newLocation === ROOT_URL && (
      <Fragment>
        <SearchFlatsNavDetails onFormSubmit={onFormSubmit} />
        <MapLegendsNavDetails />
        <FilterCheckboxesNavDetails />
      </Fragment>
    )}

  </Fragment>
);

export default AppNav;
