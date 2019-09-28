import React from 'react';
import axios from 'axios';
import loadjs from 'loadjs'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { School } from 'Models/School';
import { Flat, FlatMaker } from 'Models/Flat';
import { mapInit, loadMapMarkers } from 'UtilsUI/maps';
import SchoolInfo from 'Components/SchoolInfo';
import AppNav from 'Components/AppNav';
import { mapFilters, GOOGLE_MAPS_API, ROOT_URL } from 'config';

const schoolsData = require('shared-data/schools-data.json');

import 'static/styles.scss';

// https://github.com/lucifer1004/react-google-map

interface AppState {
  newLocation: string;
  flats: Flat[];
  markers: google.maps.Marker[];
  map: google.maps.Map | null;
  schools: School[];
}

export default class App extends React.Component<{}, AppState> {
  constructor (props){
    super(props);

    this.state = {
      newLocation: ROOT_URL,
      flats: [],
      markers: [],
      map: null,
      schools: schoolsData
    }

    this.onHashChange = this.onHashChange.bind(this);
    this.onSubmitFlatForm = this.onSubmitFlatForm.bind(this);

    window.addEventListener("hashchange", this.onHashChange, false);
  }

  componentDidMount() {
    if (!loadjs.isDefined('gmap')) {
      loadjs(GOOGLE_MAPS_API, 'gmap')
    }
    
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
        const markers = loadMapMarkers(schoolsData, map);

        this.setState({
          map,
          markers
        }, () => mapInit(map));
      },
      error: () => {
        loadjs.reset()
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  onHashChange(e:HashChangeEvent) {
    this.setState({
      newLocation: e.newURL
    });
  }

  async onSubmitFlatForm (e) {
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

      console.table(tempFlats);

      this.setState({flats: tempFlats});

    } catch (e) {
      throw e;
    }
  }

  render() {
    const {schools, newLocation} = this.state;

    return (
      <Router>
        <section className="school-checker">
          <header>
            <Link className="map-home-btn" to="/">Home</Link>
            <h1 className="map-title">School Checker</h1>
          </header>
          <AppNav
            schools={schools}
            filters={mapFilters}
            newLocation={newLocation}
            onFormSubmit={this.onSubmitFlatForm}
          />
  
          <Route exact path="/" render={() => {
            if (newLocation !== ROOT_URL) {
              window.location.reload();
            }
            return <div id="map"></div>
          }
          } />
          <Route path="/school/:id" render={(props) => {
            const { params: { id } } = props.match;
            const school = schools.find((school: School) => school.id === id);

            return <SchoolInfo school={school} />
          }} />
        </section>
      </Router>
    )
  }
};
