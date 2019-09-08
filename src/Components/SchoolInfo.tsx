import React, { SFC } from 'react';
import { School } from 'models';
import InfoWindow from 'Components/InfoWindow';

const createMarkup = (__html: string) => ({
  __html
});

const SchoolInfo: SFC<{ school: School }> = ({ school }) => {

  const chartRenderer = () => {
    return Object.keys(school.charts).map(chart => {
      if (school.charts[chart]) {
        return (
          <div key={chart}>
            <h5>{school.charts[chart].text}</h5>
            <div dangerouslySetInnerHTML={createMarkup(school.charts[chart].svg)} />
          </div>
        )
      }
    });
  }

  return (
    <section className="school-info">
      <InfoWindow school={school} />

      <section>
        <h3>Charts</h3>
        {chartRenderer()}
      </section>
    </section>
  );
}

export default SchoolInfo;
