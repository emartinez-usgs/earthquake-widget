'use strict';

var CALLBACK_STACK = {};
var EQ_FEED_CALLBACK = null;

var _isEmpty = function (obj) {
	var key;

	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}

	return true;
};

var eqFeedCallback = function (geojson) {
	var url = geojson.metadata.url,
	    listeners = CALLBACK_STACK[url].listeners,
	    script = CALLBACK_STACK[url].script,
	    i = 0, numListeners = listeners.length, listener;

	// Notify listener queue
	for (; i < numListeners; i++) {
		listener = listeners[i];
		listener.callback.call(listener.context, geojson);
	}

	// Detach script from document
	if (script) {
		try {
			script.parentNode.removeChild(script);
			script = null;
		} catch (e) { /* Ignore */ }
	}

	// De-register listeners for this Url
	delete CALLBACK_STACK[url];

	if (_isEmpty(CALLBACK_STACK)) {
		// Restore original eq_feed_callback once the stack is empty
		window.eqfeed_callback = EQ_FEED_CALLBACK;
	}
};

var registerCallback = function (url, callback, context) {

	var requestPending = CALLBACK_STACK.hasOwnProperty(url);

	if (requestPending) {
		CALLBACK_STACK[url].listeners.push(
				{callback: callback, context: context});
	} else {
		CALLBACK_STACK[url] = {
			script: null,
			listeners: [{callback: callback, context: context}]
		};
	}

	return requestPending;
};

var fetchData = function (url) {
	var s = document.createElement('script');

	s.src = url;

	CALLBACK_STACK[url].script = s;

	if (!EQ_FEED_CALLBACK && window.eqfeed_callback) {
		EQ_FEED_CALLBACK = window.eqfeed_callback;
	}

	document.querySelector('script').parentNode.appendChild(s);

	window.eqfeed_callback = eqFeedCallback;
};


module.exports = {
	fetch: function (url, callback, context) {
		if (!registerCallback(url, callback, context)) {
			fetchData(url);
		}
	}
};