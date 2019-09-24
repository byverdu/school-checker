import React from 'react';

const formInputs = [
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

const FlatsForm: React.SFC<{onSubmit: (e) => void}> = ({onSubmit}) => (
  <form noValidate onSubmit={onSubmit}>
    {formInputs.map(input => <input {...input} />)}
    <input type="submit" className="xoxo" />
  </form>
)

export default FlatsForm;