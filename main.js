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

	/**
	 * Gallery
	 */
	$(document).on('click', '.gallery__images img', function (event) {
		var image;
		event.preventDefault();

		$('.gallery__image__image').html('');
		$('.gallery__image__image').html('<img src="' + this.getAttribute('data-image') + '" alt="' + this.getAttribute('src') + '" style="opacity: 0">');

		// Use load event
		setTimeout(function () {
			$('.gallery__image__image img').css('opacity', 1);
		}, 200);
	});


	/*! A fix for the iOS orientationchange zoom bug.
	 Script by @scottjehl, rebound by @wilto.
	 MIT / GPLv2 License.
	*/
	(function(w){

		// This fix addresses an iOS bug, so return early if the UA claims it's something else.
		var ua = navigator.userAgent;
		if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
			return;
		}

		var doc = w.document;

		if( !doc.querySelector ){ return; }

		var meta = doc.querySelector( "meta[name=viewport]" ),
			initialContent = meta && meta.getAttribute( "content" ),
			disabledZoom = initialContent + ",maximum-scale=1",
			enabledZoom = initialContent + ",maximum-scale=10",
			enabled = true,
			x, y, z, aig;

		if( !meta ){ return; }

		function restoreZoom(){
			meta.setAttribute( "content", enabledZoom );
			enabled = true;
		}

		function disableZoom(){
			meta.setAttribute( "content", disabledZoom );
			enabled = false;
		}

		function checkTilt( e ){
					aig = e.accelerationIncludingGravity;
					x = Math.abs( aig.x );
					y = Math.abs( aig.y );
					z = Math.abs( aig.z );

					// If portrait orientation and in one of the danger zones
			if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
				if( enabled ){
					disableZoom();
				}
			} else if( !enabled ){
				restoreZoom();
			}
		}

		w.addEventListener( "orientationchange", restoreZoom, false );
		w.addEventListener( "devicemotion", checkTilt, false );

	})( this );

	(function () {
		window.MBP = window.MBP || {};

		MBP.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
		MBP.ua = navigator.userAgent;

		if (MBP.viewportmeta && /iPhone|iPad|iPod/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua)) {
			MBP.viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.addEventListener('gesturestart', MBP.gestureStart, false);
		}
	}());

	/**
	 * Parallax scrolling
	 */
	(function () {
		var $scrollTop = $('[data-scroll-top]');
		var $scrollBottom = $('[data-scroll-bottom]');
		var $element;

		var scrollPosition = 0;

		var _callback = function () {
			var scroll = window.pageYOffset;
			var i;

			if (scrollPosition === scroll) {
				window.cancelAnimationFrame(_callback);

				return false;
			}

			for (i = 0; i < $scrollTop.length; i++) {
				$element = $($scrollTop[i]);
				$element.css('transform', 'translateY(' + ((scroll - $element.parent().offset().top) / 4) + 'px)');
			}

			for (i = 0; i < $scrollBottom.length; i++) {
				$element = $($scrollBottom[i]);
				$element.css('transform', 'translateY(' + ((scroll - $element.parent().offset().top) / -4) + 'px)');
			}
			window.cancelAnimationFrame(_callback);
		};

		$(window).on('scroll', function () {
			window.requestAnimationFrame(_callback);
		});
	}());


	/**
	 * Tracking
	 */

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// | Google Universal Analytics                                            |
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// More information about the Google Universal Analytics:
	// https://developers.google.com/analytics/devguides/collection/analyticsjs/
	// http://mathiasbynens.be/notes/async-analytics-snippet#universal-analytics
	(function () {
		(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=o.createElement(i);r=o.getElementsByTagName(i)[0];e.src='//www.google-analytics.com/analytics.js';r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));

		// Create tracker object
		ga('create', 'UA-52857433-1');

		// Send a page view
		// https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
		ga('send', 'pageview');

		// Track events
		// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
		$('body').on('click', '[data-ga-category]', function (e) {
			var $target = $(e.currentTarget);
			var action = $target.attr('data-ga-action') || undefined;     // required
			var category = $target.attr('data-ga-category') || undefined; // required
			var label = $target.attr('data-ga-label') || undefined;
			var value = parseInt($target.attr('data-ga-value'), 10) || undefined;

			// Register the event
			if ( ga && category && action ) {
				ga('send', 'event', category, action, label, value, {});
			}
		});
	}());
}());
