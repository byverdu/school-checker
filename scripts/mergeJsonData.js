const admissionData = require('../shared-data/schools-data-admission.json');
const schoolsData = require('../shared-data/schools-data-web.json');
const fs = require('fs');

const tempData = schoolsData.map(element => {
  const {admissionNumber, furthestDistance} = admissionData.find(item => item.name === element.name);

  return {
    ...element,
    admissionNumber,
    furthestDistance
  };
});

console.log(tempData[0]);

fs.writeFile(
  'shared-data/schools-data.json',
  JSON.stringify(tempData),
  (err) => {
    if (err) console.log(err)
  }
);
