(function () {
	'use strict';

	// Load CSS async. Script adapted from https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js
	function loadCSS (href, before, media) {
		var styleSheet  = window.document.createElement('link');
		var reference = before || window.document.getElementsByTagName('script')[0];

		styleSheet.rel = "stylesheet";
		styleSheet.href = href;
		styleSheet.media = "only x";
		reference.parentNode.insertBefore(styleSheet, reference);

		setTimeout(
			function () {
				styleSheet.media = media || 'all';
			}
		);
	}

	loadCSS('http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css');

	var map = L.map('map', {
		center: [50.95109, 6.91963],
		zoom: 13,
		scrollWheelZoom: false,
		doubleClickZoom: false
	});

	L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
		attribution: '&copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy;<a href="http://developer.mapquest.com/web/products/open/map">MapQuest</a>',
		maxZoom: 18,
	}).addTo(map);

	L.marker([50.95109041843519, 6.9196271896362305]).addTo(map);
}());
