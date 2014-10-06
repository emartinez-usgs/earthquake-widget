Earthquake Widget
=================

Allows users to embed an earthquake map on their page.


Building the Project
--------------------

Before being able to use this widget on your own page, you must "compile" the
source into the distributable versions of the code. To do this you must take the
following steps:

1. Install dependencies
   - [Git](http://git-scm.com/)
   - [Node](http://nodejs.org/)

2. Clone the project to your local computer
   - ```git clone https://github.com/usgs/earthquake-widget.git```

3. Install and build the project to obtain distributable code
   - ```cd earthquake-widget```
   - ```npm install```

You can preview the built code on your local system with
```grunt preview:production```, or you can simply copy the
```usgs-earthquake-map.css``` and ```usgs-earthquake-map.js``` files to your
web server.


Embedding a Map
---------------

Add a link tag for the CSS to the top of your page
(typically somewhere in the ```<head>```)...

```html
 <link rel="stylesheet" href=".../usgs-earthquake-map.css"/>
```

Add a script tag for the Javascript to the bottom of your page
(typically just before the ```</body>```)...

```html
 <script src=".../usgs-earthquake-map.js"></script>
```

Add anchor tags for each map you wish to embed
(this can be anywhere in your page)...

```html
 <a href="FEED_URL" class="usgs-earthquake-map">Download Data</a>
```

Valid ```FEED_URL```s can be found on the following pages:

 1. [Atom](http://earthquake.usgs.gov/earthquakes/feed/v1.0/atom.php)
 2. [CSV](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php)
 3. [GeoJSON](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
 4. [QuakeML](http://earthquake.usgs.gov/earthquakes/feed/v1.0/quakeml.php)


And that's all. When the page loads, the script will automatically look for
any element with the "usgs-earthquake-map" class and attempt to turn it into
an interactive map.

Advanced Usage
--------------

There are a few options to further customize which data are displayed as well
as how the data are displayed. The primary mechanism for this is via the
```data-options``` attribute on the anchor tags for each map you wish to embed.

The data-options should be a serialized representation of a JSON string. Some
simple customizations that can be made include:

### bounds (Array)
Specifying this option allows you to set the default extent of the map to
use the given bounds.

```html
<a ... data-options="{'bounds': [[minLat, minLng],[maxLat,maxLng]]}">...</a>
```

Min/max lat/lng are (as expected), the minimum and maximum latitude and
longitude (respectively) of the desired map extent.

### featureFilter (String)
Specifying this option allows you to choose which features will be plotted. The
value for this option should be the name of a function (defined elsewhere) that
should be used to determine if a feature should be plotted on the map.

Each feature returned as part of the data feed is passed into this function.
This function should return ```true``` if the feature should be included on the
map and ```false``` otherwise.

```html
<script>
// Only include features with magnitude between 3 and 4.
var filterByMagnitude = function (feature) {
	return feature.properties.mag >= 3.0 && feature.properties.mag <= 4.0;
};
</script>
<a ... data-options="{'featureFilter': 'filterByMagnitude'}">...</a>
```

### featureFormat (String)
Specifying this option allows you to choose how the data in the pop-up
information window will be formatted. The value for this option should be the
name of a function (defined elsewhere) that should be used to format the
information in the pop-up window.

```html
<script>
// Only display earthquake title in pop-up bubble
var popupNameOnly = function (feature) {
	return feature.properties.title;
};
</script>
<a ... data-options="{'featureFormat': 'popupNameOnly'}">...</a>
```

### featureStyle (String)
Specifying this option allows you to determine how the data are displayed on
the map. The value for this option should be the name of a function (defined
elsewhere) that should be used to style each feature on the map.

```html
<script>
// Style features differently if event depth is less-than or greater-than 10 km.
var styleByDepth = function (feature) {
	return {
		fillColor: (feature.geometry.coordinates[2] > 10) ? '#03F' : '#F30'
	};
};
</script>
<a ... data-options="{'featureStyle': 'styleByDepth'}">...</a>
```

See the (Leaflet Documentation)[http://leafletjs.com/reference.html#path] for
more information about available styling options.

More documentation about feature properties can be found on the (U.S.
Geological Survey Earthquake Website)
[http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php]