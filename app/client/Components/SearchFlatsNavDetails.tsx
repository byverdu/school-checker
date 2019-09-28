import React, { SFC } from 'react';
import { formInputs } from 'config';

const FlatsForm: React.SFC<{onSubmit: (e) => void}> = ({onSubmit}) => (
  <form noValidate onSubmit={onSubmit}>
    {formInputs.map(input => <input {...input} key={input.name} />)}
    <input type="submit" className="xoxo" />
  </form>
);

const SearchFlatsNavDetails: SFC<{onFormSubmit: (e) => void}> = ({onFormSubmit}) => (
  <details>
    <summary>Flats Search</summary>
    <FlatsForm onSubmit={onFormSubmit} />
  </details>
);

export default SearchFlatsNavDetails;