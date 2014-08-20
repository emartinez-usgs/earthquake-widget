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

```
 <link rel="stylesheet" href=".../usgs-earthquake-map.css"/>
```

Add a script tag for the Javascript to the bottom of your page
(typically just before the ```</body>```)...

```
 <script src=".../usgs-earthquake-map.js"></script>
```

Add anchor tags for each map you wish to embed
(this can be anywhere in your page)...

```
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
