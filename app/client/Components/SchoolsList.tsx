import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { School } from 'Models/School';

interface SchoolsListProps {
  schools: School[];
  activeId: any;
}

const SchoolsList: React.SFC<SchoolsListProps> = ({ schools, activeId }) => {

  const [filteredSchools, setFilteredSchools] = useState(schools);
  const onChangeHandler = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    const newSchoolsSet = schools.filter(school => school.name.toLowerCase().includes(value));

    setFilteredSchools(newSchoolsSet);
  } 
    
  return (
    <>
      <input className="school-link-filter" type="text" placeholder="Filter by name" onChange={onChangeHandler}/>
      <div className="school-link-container">
        {
          filteredSchools.map(school => {
            const activeClass = activeId === school.id ? 'school-link-active' : '';
    
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
    </>
  );
}

export default SchoolsList;