const boundaries = require('../shared-data/boundaries.json');
const fs = require('fs');

const result = boundaries.map(item => ({
  lng: item[0],
  lat: item[1]
}))

fs.writeFile(
  'shared-data/polygon-data.json',
  JSON.stringify(result),
  (err) => {
    if (err) console.log(err)
  }
);
