/*! Mah Downloads - v0.1.0
 * https://github.com/emeaguiar/mah-downloads
 * Copyright (c) 2017; * Licensed GPLv2+ */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
	'use strict';

	// Verify object exists in global scope.

	if ('object' !== _typeof(window.Mah)) {
		window.Mah = {};
	}

	window.Mah.Dropper = function () {
		var init = function init() {
			console.log('init dropper');
		};

		return {
			init: init
		};
	}();

	document.addEventListener('DOMContentLoaded', window.Mah.Dropper.init);
})();

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
	'use strict';

	// Verify object exists in global scope.

	if ('object' !== _typeof(window.Mah)) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = function () {
		var init = function init() {
			var attachmentBox = document.getElementById('mah-attachment');
		};

		return {
			init: init
		};
	}();

	document.addEventListener('DOMContentLoaded', window.Mah.MahDownloadsAdmin.init);
})();

},{}]},{},[1,2]);
