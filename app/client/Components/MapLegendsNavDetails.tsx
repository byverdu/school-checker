import React from 'react';
import SvgIcon from 'Components/SvgIcon';
import { EnumOfstedRating, EnumTypeOfSchool, EnumOfstedRatingColouring, mapTypeOfSchool } from 'Models/Enums';

let initialSchoolTypeCount = 0;

const MapLegends: React.SFC = () => (
  <details>
    <summary>Map Legends</summary>
    <div className="legend-container">
      <div className="legend-ratings">
        <ul>
          <li><h5>Ofsted Ratings</h5></li>
          {
            Object.keys(EnumOfstedRating).map((rating, index) => {

              if (isNaN(Number(rating))) {
                return <li key={index}>
                  <SvgIcon type="school" color={EnumOfstedRatingColouring[rating]} /> {rating}
                </li>
              }

              return;
            })
          }
        </ul>
      </div>

      <div className="legend-school-types">
        <ul>
          <li><h5>School types</h5></li>
          {
            Object.keys(EnumTypeOfSchool).map((type, index) => {
              const elements = [];
              if (isNaN(Number(type))) {
                elements.push(
                  <li
                    key={index}
                    className="legend-school-types-item"
                  >
                    {type}:
                  <ul>
                      <li>{mapTypeOfSchool[initialSchoolTypeCount]}</li>
                    </ul>
                  </li>
                );
              }

              // Hack, First elements in Object.keys are the number values
              if (isNaN(Number(type))) {
                initialSchoolTypeCount += 1;
              }

              return elements;
            })
          }
        </ul>
      </div>
    </div>
  </details>
);

export default MapLegends;