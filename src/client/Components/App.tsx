import React, { createRef } from 'react';
import axios from 'axios';
import loadjs from 'loadjs'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { School } from 'Models/School';
import { Flat, FlatMaker } from 'Models/Flat';
import { mapInit, loadMapMarkers, loadFlatMarkers } from 'UtilsUI/maps';
import ErrorBoundary from 'Components/ErrorBoundary';
import SchoolInfo from 'Components/SchoolInfo';
import AppNav from 'Components/AppNav';
import MapWrapper from 'Components/MapWrapper';
import { GOOGLE_MAPS_API, ROOT_URL, DEFAULT_LAT_LNG, DEFAULT_ZOOM } from 'config';
import { CustomMarkerOpts } from 'Models/Enums';

const schoolsData = require('shared-data/schools-data.json');

import 'static/styles.scss';

interface AppState {
  newLocation: string;
  flats: Flat[];
  schoolMarkers: google.maps.Marker[];
  flatMarkers: google.maps.Marker[];
  map: google.maps.Map | null;
  schools: School[];
  triggerMapLoad: boolean;
  fetchingFlats: boolean;
}

interface AppContext {
  schoolMarkers: google.maps.Marker[];
  map: google.maps.Map | null;
  schools: School[];
  setMapMarkers: (schools: School[]) => void
}

export const GoogleMapContext = React.createContext<AppContext>({
  schools: [],
  map: null,
  schoolMarkers: [],
  setMapMarkers: null
});

export default class App extends React.Component<{}, AppState> {
  searchInputBox;
  constructor(props) {
    super(props);

    this.state = {
      newLocation: ROOT_URL,
      flats: [],
      schoolMarkers: [],
      flatMarkers: [],
      map: null,
      schools: schoolsData,
      triggerMapLoad: false,
      fetchingFlats: false
    }

    this.onHashChange = this.onHashChange.bind(this);
    this.onSubmitFlatForm = this.onSubmitFlatForm.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.deleteFlatMarkers = this.deleteFlatMarkers.bind(this);
    this.loadMap = this.loadMap.bind(this);

    this.searchInputBox = createRef<HTMLInputElement>();

    window.addEventListener("hashchange", this.onHashChange, false);
  }

  componentDidMount() {
    if (!loadjs.isDefined('gmap')) {
      loadjs(GOOGLE_MAPS_API, 'gmap')
    }

    loadjs.ready('gmap', {
      success: () => {
        this.setState({ triggerMapLoad: true });
      },
      error: () => {
        loadjs.reset()
        console.error('Unable to fetch Google Map sdk')
      },
    })
  }

  componentDidUpdate() {
    if (this.state.triggerMapLoad && window.location.href === ROOT_URL) {
      this.loadMap();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  loadMap() {
    const LatLng: google.maps.LatLng = new google.maps.LatLng(DEFAULT_LAT_LNG);
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        center: LatLng,
        zoom: DEFAULT_ZOOM,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    );
    const schoolMarkers = loadMapMarkers(schoolsData, map);

    this.setState({
      map,
      schoolMarkers,
      triggerMapLoad: false
    }, () => mapInit(map, schoolMarkers, this.searchInputBox.current));
  }

  onHashChange(e: HashChangeEvent) {
    this.setState({
      newLocation: e.newURL
    });
  }

  async onSubmitFlatForm(e) {
    e.preventDefault();
    const formValues = {};
    this.setState({ fetchingFlats: true });


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
      const flats = flatResponse.data.flats.map(flat => FlatMaker.create(flat));
      const flatMarkers = loadFlatMarkers(flats, this.state.map);

      console.table(flats);

      this.setState({ flats, flatMarkers, fetchingFlats: false });

    } catch (e) {
      throw e;
    }
  }

  setMapMarkers(schools: School[]) {
    // delete previous markers
    this.state.schoolMarkers.forEach(marker => {
      if ((marker as CustomMarkerOpts).id === 'school') {
        marker.setMap(null);
      }
    })

    const { map } = this.state;
    const schoolMarkers = loadMapMarkers(schools, map);

    this.setState({
      schoolMarkers
    });
  }

  deleteFlatMarkers() {
    // delete previous markers
    this.state.flatMarkers.forEach(marker => {
      marker.setMap(null);
    });

    this.setState({
      flatMarkers: []
    });
  }

  render() {
    const { schools, newLocation, map, schoolMarkers, fetchingFlats } = this.state;

    return (
      <ErrorBoundary>
        <GoogleMapContext.Provider value={{ schools, map, schoolMarkers, setMapMarkers: this.setMapMarkers }}>
          <Router>
            <section className="school-checker">
              {fetchingFlats && <div className="map-loader"></div>}
              <header>
                <Link className="map-home-btn" to="/">Home</Link>
                <h1 className="map-title">School Checker</h1>
              </header>
              <AppNav
                schools={schools}
                newLocation={newLocation}
                onFormSubmit={this.onSubmitFlatForm}
                deleteFlatMarkers={this.deleteFlatMarkers}
              />

              <Route exact path="/" render={() => {
                if (newLocation !== ROOT_URL) {
                  window.location.reload();
                }
                return <MapWrapper ref={this.searchInputBox} />
              }
              } />
              <Route path="/school/:id" render={(props) => {
                const { params: { id } } = props.match;
                const school = schools.find((school: School) => school.id === id);

                return <SchoolInfo school={school} />
              }} />
            </section>
          </Router>
        </GoogleMapContext.Provider>
      </ErrorBoundary>
    )
  }
};
