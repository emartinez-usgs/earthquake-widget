'use strict';

var L = require('leaflet'),
    DataFetcher = require('./DataFetcher.js');

var ARCGIS_ONLINE = 'http://serv{s}.arcgisonline.com/ArcGIS/rest/services';

var DEFAULTS = {
	// extent: [[50.0, -125.0], [24.6, -65.0]],
	extent: [[80.0, -179.0], [-80.0, 179.0]],
	baseLayer: {
		url: ARCGIS_ONLINE + '/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
		attribution: 'National Geographic, Esri, DeLorme, HERE, UNEP-WCMC, USGS, ' +
		             'NASA, ESA, METI, NRCAN, GEBCO, NOAA, Increment P Corp.',
		minZoom: 1,
		maxZoom: 15,
		subdomains: ['ices', 'er']
	},
	map: {
		worldCopyJump: true,
		scrollWheelZoom: false
	}
};

var DEFAULT_FEED_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
		'summary/all_hour.geojsonp';

var EmbeddedMap = module.exports = function (target) {
	var options = Object.create(DEFAULTS),
	    feedUrl = null,
	    targetOpts = null,
	    key = null;

	// Set data url
	try {
		feedUrl = target.getAttribute('href');
		feedUrl = feedUrl.substr(0, feedUrl.lastIndexOf('.')) + '.geojsonp';
	} catch (e) {
		feedUrl = DEFAULT_FEED_URL;
	}

	// Set configuration options
	if (target.hasAttribute('data-options')) {
		targetOpts = target.getAttribute('data-options');
		try {
			targetOpts = JSON.parse(targetOpts.replace(/'/g, '"'));
			for (key in targetOpts) {
				if (targetOpts.hasOwnProperty(key)) {
					options[key] = targetOpts[key];
				}
			}
		} catch (e) {/* Ignore */}
	}

	// Set a filter function
	if (options.featureFilter &&
			typeof window[options.featureFilter] === 'function') {
		options.featureFilter = window[options.featureFilter];
	} else {
		options.featureFilter = this._featureFilter;
	}

	// Set a style function
	if (options.featureStyle &&
			typeof window[options.featureStyle] === 'function') {
		options.featureStyle = window[options.featureStyle];
	} else {
		options.featureStyle = this._featureStyle;
	}

	// Set an info function
	if (options.featureFormat &&
			typeof window[options.featureFormat] === 'function') {
		options.featureFormat = window[options.featureFormat];
	} else {
		options.featureFormat = this._featureFormat;
	}

	this._el = document.createElement('div');
	this._target = target;
	this._feedUrl = feedUrl;
	this._options = options;

	this._initialize();
};

EmbeddedMap.prototype._initialize = function () {
	this._initializeMap();
	this._initializeData();
	this._embedMap();
};

EmbeddedMap.prototype.render = function (data) {
	var _this = this,
	    options = this._options,
	    eqLayer = this._eqLayer,
	    map = this._map;

	if (eqLayer) {
		eqLayer.removeFrom(map);
		eqLayer = null;
	}

	this._eqLayer = eqLayer = L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng);
		},

		style: options.featureStyle || this._featureStyle,
		onEachFeature: function (feature, layer) {
			var markup = (options.featureFormat) ? options.featureFormat(feature) :
					_this._featureFormat(feature);

			if (markup) {
				layer.bindPopup(markup, {autoPan: !options.static});
			}
		},

		filter: options.featureFilter || this._featureFilter
	});

	map.addLayer(eqLayer);

};

EmbeddedMap.prototype._initializeMap = function () {
	var _this = this,
	    options = this._options,
	    baseLayer = L.tileLayer(options.baseLayer.url, options.baseLayer),
	    map;

	if (options.hasOwnProperty('static') && options.static) {
		this._map = map = L.map(this._el, {
			dragging: false,
			touchZoom: false,
			scrollWheelZoom: false,
			doubleClickZoom: false,
			boxZoom: false,
			tap: false,
			keyboard: false,
			zoomControl: false
		});
	} else {
		this._map = map = L.map(this._el, options.map);
	}

	if (this._options.bounds) {
		this._map.once('load', function () {
			_this._map.fitBounds(options.bounds);
		});
	}

	map.addLayer(baseLayer);
};

EmbeddedMap.prototype._initializeData = function () {
	DataFetcher.fetch(this._feedUrl, this.render, this);
};

EmbeddedMap.prototype._embedMap = function () {
	this._el.classList.add('usgs-earthquake-map-widget');
	this._target.parentNode.insertBefore(this._el, this._target);
	this._target.parentNode.removeChild(this._target);

	this._map.invalidateSize();
	this._map.fitBounds(this._options.extent);
};


EmbeddedMap.prototype._featureFilter = function (/*feature*/) {
	return true;
};

EmbeddedMap.prototype._featureFormat = function (feature) {
	var properties = feature.properties;

	return [
		'<div class="usgs-earthquake-event-summary">',
			'<strong>', properties.title, '</strong>',
			'<em>', (new Date(properties.time)).toUTCString(), '</em>',
			'<a href="', properties.url, '">More Information</a>',
		'</div>'
	].join('');
};

EmbeddedMap.prototype._featureStyle = function (feature) {
	var now = (new Date()).getTime(),
	    properties = feature.properties,
	    eventTime = properties.time,
	    eventMag = properties.mag,
	    age = null, color = '#FFF', size = 5;

	age = now - eventTime;
	if (age <= 60000) {
		color = '#F00';
	} else if (age <= 86400000) {
		color = '#F90';
	} else if (age <= 604800000) {
		color = '#FF0';
	}

	if (eventMag >= 7.0) {
		size = 12;
	} else if (eventMag >= 6.0) {
		size = 10;
	} else if (eventMag >= 5.0) {
		size = 8;
	} else if (eventMag >= 4.0) {
		size = 7;
	} else if (eventMag >= 3.0) {
		size = 5;
	} else if (eventMag >= 2.0) {
		size = 4;
	} else if (eventMag >= 1.0) {
		size = 3;
	}

	return {
		// border
		stroke: true,
		weight: 1,
		color: '#000',
		opacity: 1.0,

		// background
		fill:true,
		radius: size,
		fillColor: color,
		fillOpacity: 1.0
	};
};