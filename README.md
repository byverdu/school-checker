# School Checker

> Data updated for 2020

Web Application that will show in Google maps the information about schools and what properties are for rent/sell around it.

## How to get boundaries of a place

Steps to follow for creating a `Polyline` in Google Maps and draw the boundaries of a place.

1. Go to [https://nominatim.openstreetmap.org/](https://nominatim.openstreetmap.org/) and search for the place that you want.

2. From the list, select the place that you are looking for and click on it.

3. On the next page find the record that contains `boundary:administrative` in the **type** column and get the number that shows in the **OSM** column

4. Visit [http://polygons.openstreetmap.fr/index.py?id=347950](http://polygons.openstreetmap.fr/index.py?id=347950) and change the id for the one shown as **OSM** in the previous step.

5. `GeoJson` will give the array of pairs **lng-lat** for the boundary of your place.

6. Save them as shown in snipet 1

7. Create the polyline in Google Maps as shown in snipet 2:

```js
// GeoJson output example
{
  "type": "GeometryCollection",
  "geometries": [{
    "type": "MultiPolygon",
    "coordinates": [
      [ 2.2277526, 41.4096238 ],
      [ 2.2275026, 41.4094143 ],
    ]
  }]
}

// snipet  1
const result = boundaries.map(item => ({
  lng: item[0],
  lat: item[1]
}));

// snipet  2
const paths = require('../../shared-data/polygon-data.json');

const wandsworthBoundariesLine = new google.maps.Polyline({
  path: paths,
  strokeColor: '#EF476F',
  strokeWeight: 4,
});

// Draw the polygon on the desired map instance
wandsworthBoundariesLine.setMap(map);
```
