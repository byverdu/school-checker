import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { WindowMap, School } from 'models';
import { schoolAppInitMap } from 'utils/maps';
import SchoolInfo from 'Components/SchoolInfo';
import AppNav from 'Components/AppNav';

const schoolsData = require('shared-data/schools-data.json');

import '../../static/styles.scss';

const mapFilters = [
  {
    title: 'Ofsted Rating',
    propToRender: 'ofstedRating'
  },
  {
    title: 'Type of School',
    propToRender: 'type'
  },
  {
    title: 'Reading Score',
    propToRender: 'statsReading'
  },
  {
    title: 'Writing Score',
    propToRender: 'statsWriting'
  },
  {
    title: 'Maths Score',
    propToRender: 'statsMaths'
  },
  {
    title: 'Religions',
    propToRender: 'religion'
  },
  {
    title: 'Pupils Ages',
    propToRender: 'age'
  }
].map(item => ({
  ...item,
  schools: schoolsData
}));

const App = () => {

  (window as WindowMap).schoolAppInitMap = (function () {
    schoolAppInitMap(schoolsData);
  });

  const [prevLocation, setPrevLocation] = useState('/');

  return (
    <Router>
      <section className="school-checker">
        <header>
          <Link className="map-home-btn" to="/">Home</Link>
          <h1 className="map-title">School Checker</h1>
        </header>
        <AppNav
          schools={schoolsData}
          filters={mapFilters}
          prevLocation={prevLocation}
        />

        <Route exact path="/" render={() => {
            if (prevLocation !== '/') {
              window.location.reload();
              setPrevLocation('/');
            }
            return <div id="map"></div>
          }
        } />
        <Route path="/school/:id" render={ (props) => {
          const {params : {id}, url} = props.match;
          const school = schoolsData.find((school: School) => school.id === id);
          setPrevLocation(url);
            
          return <SchoolInfo school={school} />
        }} />
      </section>
    </Router>
  )
}

export default App;
