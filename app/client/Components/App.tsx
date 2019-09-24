import axios from 'axios';
import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { WindowMap, School } from 'Models/School';
import { Flat, FlatMaker } from 'Models/Flat';
import { schoolAppInitMap } from 'UtilsUI/maps';
import SchoolInfo from 'Components/SchoolInfo';
import AppNav from 'Components/AppNav';

const schoolsData = require('shared-data/schools-data.json');

import 'static/styles.scss';

// https://github.com/lucifer1004/react-google-map

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

  async function onSubmit(e) {
    e.preventDefault();
    const formValues = {}
    
    Array.from(
      (document.querySelector('form') as HTMLFormElement).elements
    ).forEach(elem => {
      const inputElem = elem as HTMLInputElement
      if (inputElem.name !== "" && inputElem.value !== "") {
        formValues[inputElem.name] = inputElem.value
      }
    });

    try {

      const flatResponse = await axios.post('flats', formValues);
      const tempFlats = flatResponse.data.flats.map(flat => FlatMaker.create(flat));

      setFlats(tempFlats);

    } catch (e) {
      throw e;
    }
  
  }

  (window as WindowMap).schoolAppInitMap = (function () {
    schoolAppInitMap(schoolsData);
  });

  const [prevLocation, setPrevLocation] = useState<string>('/');
  const [flats, setFlats] = useState<Flat[]>([]);

  console.log(flats);

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
          onFormSubmit={onSubmit}
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
