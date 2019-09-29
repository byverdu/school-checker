export const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBpuUN_YIh-R1chI7EcNG1ic62zoDPvj14';

export const ROOT_URL = 'http://localhost:3000/#/';

export const DEFAULT_LAT_LNG = {
  lat: 51.4372907,
  lng: -0.2058498999999756
};

export const DEFAULT_ZOOM = 14;

export const mapFilters = [
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
];

export const formInputs = [
  {
    type: 'text',
    name: 'place_name',
    defaultValue: 'putney',
    placeholder: 'Place name, post code, tube station, etc'
  },
  {
    type: 'text',
    name: 'listing_type',
    defaultValue: 'rent',
    placeholder: 'buy, rent or share'
  },
  {
    type: 'number',
    name: 'price_min',
    defaultValue: '0',
    placeholder: 'Min Price'
  },
  {
    type: 'number',
    name: 'price_max',
    defaultValue: '2500',
    placeholder: 'Max Price'
  },
  {
    type: 'number',
    name: 'bedroom_min',
    defaultValue: '2',
    placeholder: 'Min bedroom'
  },
  {
    type: 'number',
    name: 'bedroom_max',
    defaultValue: '5',
    placeholder: 'Max bedroom'
  }
];
