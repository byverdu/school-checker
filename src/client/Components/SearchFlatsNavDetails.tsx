import React, { SFC } from 'react';
import { formInputs } from 'config';

  const FlatsForm: React.SFC<{onSubmit: (e) => void, deleteFlatMarkers: () => void}> = ({onSubmit, deleteFlatMarkers}) => (
  <form noValidate onSubmit={onSubmit} className="flats-search-form">
    {formInputs.map(input => <label className="flats-search-label"  key={input.name}>
      <span>{input.name}</span>
      <input className="flats-search-input" {...input} />
    </label>)}
    <input type="submit" className="flats-search-input" />
    <input type="button" onClick={deleteFlatMarkers} className="flats-search-input" value="Clear Search" />
  </form>
);

const SearchFlatsNavDetails: SFC<{onFormSubmit: (e) => void, deleteFlatMarkers: () => void}> = ({onFormSubmit, deleteFlatMarkers}) => (
  <details>
    <summary>Flats Search</summary>
    <FlatsForm deleteFlatMarkers={deleteFlatMarkers} onSubmit={onFormSubmit} />
  </details>
);

export default SearchFlatsNavDetails;