import React from 'react';
import { Flat } from 'Models/Flat';

function monthlyPrice(price: number) {
  return Math.round((price * 52) / 12)
}

const FlatInfoWindow: React.SFC<{ flat: Flat }> = ({ flat }) => (
  <div>
    <h3>{flat.title}</h3>
    <ul>
      <li>Price {flat.price_type}: {flat.price_formatted}</li>
      {flat.price_type === 'weekly' && (
        <li>Price monthly: {`£${monthlyPrice(flat.price)}`}</li>
      )}
      <li>Property Type: {flat.property_type}</li>
      <li>Number of bedrooms: {flat.bedroom_number}</li>
      <li>Last updated: {flat.updated_in_days}</li>
      <li><a href={flat.lister_url} target="_blank">Visit source</a></li>
    </ul>
    <img src={flat.img_url} />
  </div>
);

export default FlatInfoWindow;
