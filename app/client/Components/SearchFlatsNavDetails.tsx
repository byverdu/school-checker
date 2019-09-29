import React, { SFC } from 'react';
import { formInputs } from 'config';

const FlatsForm: React.SFC<{onSubmit: (e) => void}> = ({onSubmit}) => (
  <form noValidate onSubmit={onSubmit} className="flats-search-form">
    {formInputs.map(input => <label className="flats-search-label"  key={input.name}>
      <span>{input.name}</span>
      <input className="flats-search-input" {...input} />
    </label>)}
    <input type="submit" className="flats-search-input" />
  </form>
);

const SearchFlatsNavDetails: SFC<{onFormSubmit: (e) => void}> = ({onFormSubmit}) => (
  <details>
    <summary>Flats Search</summary>
    <FlatsForm onSubmit={onFormSubmit} />
  </details>
);

export default SearchFlatsNavDetails;