import React, { useState, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { School } from 'Models/School';
import { GoogleMapContext } from 'Components/App';

interface SchoolsListProps {
  schools: School[];
  activeId: any;
}

const SchoolsListNavDetails: React.SFC<SchoolsListProps> = ({ schools, activeId }) => {
  
  const {setMapMarkers} = useContext(GoogleMapContext);
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const onChangeHandler = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    const newSchoolsSet = schools.filter(school => school.name.toLowerCase().includes(value));

    setFilteredSchools(newSchoolsSet);
    setMapMarkers(newSchoolsSet);
  } 
    
  return (
    <details>
      <summary>Primary Schools Details</summary>
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
    </details>
  );
}

export default memo(SchoolsListNavDetails);