import axios from 'axios';
import loadjs from 'loadjs'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { WindowMap, School, SchoolMaker } from 'Models/School';
import { Flat, FlatMaker } from 'Models/Flat';
import { schoolAppInitMap } from 'UtilsUI/maps';
import SchoolInfo from 'Components/SchoolInfo';
import AppNav from 'Components/AppNav';

const schoolsData = require('shared-data/schools-data.json');

import 'static/styles.scss';
import { createSchoolMarker } from 'UtilsUI/marker';
import createSchoolPopup from 'UtilsUI/popup';

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpuUN_YIh-R1chI7EcNG1ic62zoDPvj14';

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

function loadMapMarkers(
  schools: School[],
  map: google.maps.Map,
  markers: google.maps.Marker[]
) {
  schools.forEach((school: School) => {
    const tempSchool = SchoolMaker.create(school);
    const marker = createSchoolMarker(map, tempSchool);
    createSchoolPopup({
      position: new google.maps.LatLng(school.lat, school.lng),
      textContent: school.name,
      map
    });

    markers.push(marker);
  });
}

const App = () => {

  useEffect(() => {
    if (!loadjs.isDefined('gmap')) loadjs(GOOGLE_MAPS_API, 'gmap')
    loadjs.ready('gmap', {
      success: () => {
        const LatLng: google.maps.LatLng = new google.maps.LatLng(51.4372907, -0.2058498999999756);
        const zoomMap = 14;
        const map = new google.maps.Map(
          document.getElementById('map'),
          {
            center: LatLng,
            zoom: zoomMap
          }
        );

        setMap(map);
      },
      error: () => {
        loadjs.reset()
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }, [])

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
  const [map, setMap] = useState<google.maps.Map | null>(null);

  console.log(flats);

  return (
    <Router>
      <section className="school-checker">
        <header>
          <Link className="map-home-btn" to="/">Home</Link>
          <h1 className="map-title">School Checker</h1>
          <button onClick={() => {
            loadMapMarkers(schoolsData, map, []);
          }} >Magic</button>
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
        <Route path="/school/:id" render={(props) => {
          const { params: { id }, url } = props.match;
          const school = schoolsData.find((school: School) => school.id === id);
          setPrevLocation(url);

          return <SchoolInfo school={school} />
        }} />
      </section>
    </Router>
  )
}

export default App;
