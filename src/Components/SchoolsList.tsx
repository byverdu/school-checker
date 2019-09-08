import React from 'react';
import { Link } from 'react-router-dom';
import { School } from 'models';

interface SchoolsListProps {
  schools: School[]
}

const SchoolsList: React.SFC<SchoolsListProps> = ({schools}) => {
  return (
    <React.Fragment>
      {
        schools.map(school => (
          <Link 
            key={school.id}
            to={`/school/${school.id}`}
            className="school-link"
          >
            {school.name}
          </Link>
        ))
      }
    </React.Fragment>
  );
}

export default SchoolsList;