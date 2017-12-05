/*! Mah Downloads - v0.1.0
 * https://github.com/emeaguiar/mah-downloads
 * Copyright (c) 2017; * Licensed GPLv2+ */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window, undefined) {
	"use strict";

	// Verify object exists in global scope.

	if ('object' !== _typeof(window.Mah)) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = function () {
		var init = function init() {
			console.log('init admin');
		};

		return {
			init: init
		};
	}();
})(undefined);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc3JjL2FkbWluL3VwbG9hZC1ib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsQ0FBRSxVQUFVLE1BQVYsRUFBa0IsU0FBbEIsRUFBOEI7QUFDL0I7O0FBRUE7O0FBQ0EsS0FBSyxxQkFBb0IsT0FBTyxHQUEzQixDQUFMLEVBQXNDO0FBQ3JDLFNBQU8sR0FBUCxHQUFhLEVBQWI7QUFDQTs7QUFFRCxRQUFPLEdBQVAsQ0FBVyxpQkFBWCxHQUFpQyxZQUFXO0FBQzNDLE1BQU0sT0FBTyxTQUFQLElBQU8sR0FBVztBQUN2QixXQUFRLEdBQVIsQ0FBYSxZQUFiO0FBQ0EsR0FGRDs7QUFJQSxTQUFPO0FBQ04sU0FBTTtBQURBLEdBQVA7QUFHQSxFQVI4QixFQUEvQjtBQVNBLENBakJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiggZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHQvLyBWZXJpZnkgb2JqZWN0IGV4aXN0cyBpbiBnbG9iYWwgc2NvcGUuXG5cdGlmICggJ29iamVjdCcgIT09IHR5cGVvZiB3aW5kb3cuTWFoICkge1xuXHRcdHdpbmRvdy5NYWggPSB7fTtcblx0fVxuXG5cdHdpbmRvdy5NYWguTWFoRG93bmxvYWRzQWRtaW4gPSAoIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGluaXQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCAnaW5pdCBhZG1pbicgKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXQ6IGluaXRcblx0XHR9O1xuXHR9ICkoKTtcbn0gKSggdGhpcyApOyJdfQ==
