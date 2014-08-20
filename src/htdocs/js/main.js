'use strict';

var EmbeddedMap = require('./EmbeddedMap.js'),
    targets = document.querySelectorAll('.usgs-earthquake-map'),
    numTargets = targets.length,
    targetIter = 0,
    target = null;

for (; targetIter < numTargets; targetIter++) {
	target = targets.item(targetIter);
	new EmbeddedMap(target);
}