import React from 'react';
import { Link } from 'react-router-dom';
import { School } from 'models';

interface SchoolsListProps {
  schools: School[];
  activeId: any;
}

const SchoolsList: React.SFC<SchoolsListProps> = ({ schools, activeId }) => (
  <div className="school-link-container">
    {
      schools.map(school => {
        const activeClass = activeId === school.id ? 'school-link-active' : null;

        return (
          <Link
            key={school.id}
            to={`/school/${school.id}`}
            className={`school-link ${activeClass}`}
          >
            {school.name}
          </Link>
        )
      })
    }
  </div>
);

export default SchoolsList;