import React, { SFC } from 'react';
import { School, SchoolMaker, mapTypeOfSchool, EnumTypeOfSchool } from 'models';

const createMarkup = (__html: string) => ({
  __html
});

const schoolInfoRenderer = (school: School): React.ReactElement[] => {
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

  return Object.keys(rest).map((item) => (
    <div className="school-info-container-item">
      <h4>{item ? getTermValue(item) : null}</h4>
      <p>{getDescriptionValue(item)}</p>
    </div>
  ))
}

const SchoolInfo: SFC<{ school: School }> = ({ school }) => {
  const tempSchool = SchoolMaker.create(school);

  const chartRenderer = () => {
    return Object.keys(tempSchool.charts).map(chart => {
      if (tempSchool.charts[chart]) {
        return (
          <div key={chart}>
            <h5>{tempSchool.charts[chart].text}</h5>
            <div dangerouslySetInnerHTML={createMarkup(tempSchool.charts[chart].svg)} />
          </div>
        )
      }
    });
  }

  return (
    <section className="school-info">
      <div className="school-info-container">
        {schoolInfoRenderer(tempSchool)}
      </div>

      <h3>Charts</h3>
      {!tempSchool.charts && <span>Data not available</span>}
      <section className="school-info-charts">
        {tempSchool.charts && chartRenderer()}
      </section>
    </section>
  );
}

export default SchoolInfo;
