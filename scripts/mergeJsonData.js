const admissionData = require('../shared-data/schools-data-admission.json');
const schoolsData = require('../shared-data/schools-data-web.json');
const geocodeData = require('../shared-data/schools-geocodes.json');
const fs = require('fs');

let geoTempData;

try {
    geoTempData = schoolsData.map(element => {
    const geo = geocodeData.find(item => item.id === element.id);
  
    if (geo) {
      return {
        ...element,
        lat: geo.lat,
        lng: geo.lng
      };
    }
  
    return null;
  }).filter(notNull => notNull !== null);
  
} catch (e) {
  throw e.message;
}

try {
  const adminTempData = geoTempData.map(element => {
    const {admissionNumber, furthestDistance} = admissionData.find(item => item.name === element.name);
  
    return {
      ...element,
      admissionNumber,
      furthestDistance
    };
  });
  
  console.log(adminTempData)
  
  fs.writeFile(
    'shared-data/schools-data.json',
    JSON.stringify(adminTempData),
    (err) => {
      if (err) console.log(err)
    }
  );

} catch (e) {
  throw e.message;
}