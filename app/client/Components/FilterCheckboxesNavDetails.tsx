import React, { useContext, useState } from 'react';
import { School } from 'Models/School';
import { EnumOfstedRating } from 'Models/Enums';
import { GoogleMapContext } from 'Components/App';
import { mapFilters, DEFAULT_LAT_LNG, DEFAULT_ZOOM } from 'config';

interface SchoolFilter {
  key: string;
  value: string
}

interface FilterCheckBoxesProps {
  schools: School[];
  propToRender: string;
  title: string;
  onChangeHandler: (schools: School[]) => void;
  filters: SchoolFilter[];
  setFilters: React.Dispatch<React.SetStateAction<SchoolFilter[]>>
}

const FilterCheckBoxes: React.SFC<FilterCheckBoxesProps> = ({
  schools, propToRender, title, onChangeHandler, filters, setFilters
}) => {
  const items = schools.map(school => {
    switch (propToRender) {
      case 'statsReading':
      case 'statsWriting':
      case 'statsMaths':
        return school[propToRender] ? school[propToRender].split(':')[0] : '';

      default:
        return school[propToRender]
    }
  });
  const uniqueItems = [...new Set(items)];

  return (
    <div className="map-filters-container">
      <h5>{title}</h5>
      {
        uniqueItems.map((value, index) => {
          if (value) {
            const textLabel = propToRender === 'ofstedRating' ? EnumOfstedRating[value] : value;
            return (
              <div className="map-filters-item" key={index}>
                <input
                  className="map-filters"
                  id={`${propToRender}-${index}`}
                  type="checkbox"
                  value={
                    JSON.stringify({
                      key: propToRender,
                      value
                    })
                  }
                  onChange={(e: React.ChangeEvent) => {
                    const selectedFilter: SchoolFilter = JSON.parse((e.target as HTMLInputElement).value);
                    const indexAppliedFilter = filters.findIndex(item => item.value === selectedFilter.value);
                    let newSetOfFilters = [...filters];
                    const schoolsCopy = schools.slice();

                    // toggling selected filters
                    if (indexAppliedFilter === -1) {
                      newSetOfFilters.push(selectedFilter);
                    } else {
                      newSetOfFilters.splice(indexAppliedFilter, 1);
                    }

                    setFilters(newSetOfFilters);

                    let result = [];
                    function filtersCriteria(initialCount) {
                      const iterationCount = newSetOfFilters.length;

                      // stop recursion
                      if (initialCount === iterationCount) {
                        return;
                      }

                      const { key, value } = newSetOfFilters[initialCount];
                      const filtered = schoolsCopy.filter(item => {
                        if (item[key] && item[key].includes(value)) {
                          return item[key].includes(value);
                        }
                        return item[key] === value
                      });
                      result = [...result, ...filtered];

                      initialCount += 1;
                      return filtersCriteria(initialCount);
                    }

                    filtersCriteria(0);

                    if (newSetOfFilters.length === 0) {
                      result = [...schools];
                    }

                    onChangeHandler(result)
                  }}
                />
                <label htmlFor={`${propToRender}-${index}`}>{textLabel}</label>
              </div>
            );
          }
        })
      }
    </div>
  )
}

const FilterCheckboxesNavDetails: React.SFC = () => {

  const { schools, setMapMarkers, map } = useContext(GoogleMapContext);
  const [filters, setFilters] = useState<SchoolFilter[]>([])
  const onChangeHandler = (filteredSchools: School[]) => {
    setMapMarkers(filteredSchools)
  }

  return (
    <details>
      <summary>Select Filters</summary>
      <div className="map-filters-wrapper">
        {
          mapFilters.map((filter, index) => (
            <FilterCheckBoxes
              filters={filters}
              setFilters={setFilters}
              onChangeHandler={onChangeHandler}
              schools={schools}
              key={index}
              {...filter}
            />
          ))
        }
      </div>
      <button id="clear-filters" onClick={() => {
        setMapMarkers(schools);
        setFilters([]);
        document.querySelectorAll('.map-filters:checked').forEach(item => (item as HTMLInputElement).checked = false);
        // Center the map in Putney
        map.setCenter(DEFAULT_LAT_LNG);
        map.setZoom(DEFAULT_ZOOM);
      }}>
        Clear All Filters
      </button>
    </details>
  )
}


export default FilterCheckboxesNavDetails;