import React from 'react';
import { School, EnumTypeOfSchool, mapTypeOfSchool } from 'models';

interface InfoWindowProps {
  school: School
}

const definitionListRenderer = (school: School) => {
  const {id, charts, lat, lng, name, ...rest} = school;

  const getDescriptionValue = (item: string): string | React.ReactNode => {
    switch(item) {
      case 'furthestDistance':
        return `${school.furthestDistance}m`;
      
      case 'schoolURLReport':
      case 'website':
      case 'extraInfo':
        return <a
          target="_blank"
          href={school[item]}
        >
          {school[item]}
        </a>;
      
      case 'type':
        return mapTypeOfSchool[EnumTypeOfSchool[school[item]]]

        default:
        return school[item];
    }
  }
  
  const getTermValue = (item: string): string | React.ReactNode => {
    switch(item) {
      case 'type':
        return school.type

        default:
        return item;
    }
  }

  return Object.keys(rest).map(item => (
    <React.Fragment>
      <dt>{item ? getTermValue(item) : null}</dt>
      <dd>{getDescriptionValue(item)}</dd>
    </React.Fragment>
  ))
}

const InfoWindow: React.SFC<InfoWindowProps> = ({school}) => (
  <div className="school-info-window">
    <h1>{school.name}</h1>
    <dl>
      {definitionListRenderer(school)}
    </dl>
  </div>
)

export default InfoWindow;