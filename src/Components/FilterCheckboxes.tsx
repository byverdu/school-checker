import React, { Fragment } from 'react';
import { School, EnumOfstedRating } from 'models';

interface FilterCheckBoxesProps {
  schools: School[];
  propToRender: string;
  title: string;
}

const FilterCheckBoxes: React.SFC<FilterCheckBoxesProps> = ({
  schools, propToRender, title
}) => {
  const items = schools.map(school => {
    switch (propToRender) {
      case 'ofstedRating':
        return EnumOfstedRating[school[propToRender]];

      case 'statsReading':
      case 'statsWriting':
      case 'statsMaths':
        return school[propToRender] ? school[propToRender].split(':')[0] : '';

      default:
        return school[propToRender]
    }
  });
  const uniqueItems =[...new Set(items)];

  return (
    <div className="map-filters-container">
      <h5>{title}</h5>
      {
        uniqueItems.map((value, index) => {
          if (value) {
            return (
              <div className="map-filters-item">
                <input
                  className="map-filters"
                  id={`${value}-${index}`}
                  type="checkbox"
                  value={
                    JSON.stringify({
                      key: propToRender,
                      value
                    })
                  }
                />
                <label htmlFor={`${value}-${index}`}>{value}</label>
              </div>
            );
          }
        })
      }
    </div>
  )
}

export default FilterCheckBoxes;