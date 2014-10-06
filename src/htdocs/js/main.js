'use strict';

var EmbeddedMap = require('./EmbeddedMap.js'),
    targets = document.querySelectorAll('.usgs-earthquake-map'),
    numTargets = targets.length,
    targetIter = 0;

for (; targetIter < numTargets; targetIter++) {
	new EmbeddedMap(targets.item(targetIter));
}