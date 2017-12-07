/*! Mah Downloads - v0.1.0
 * https://github.com/emeaguiar/mah-downloads
 * Copyright (c) 2017; * Licensed GPLv2+ */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _timers = require('timers');

(function () {
	'use strict';

	// Verify object exists in global scope.

	if ('object' !== _typeof(window.Mah)) {
		window.Mah = {};
	}

	/**
  * Helper functions for drag/drop functionality.
  * 
  * @author Mario Aguiar <me@marioaguiar.net>
  */
	window.Mah.Dropper = function () {
		var files = void 0,
		    uploadManager = void 0;

		/**
   * Display box when item is dragged to box.
   * @param {event} event - Triggered Event
   */
		var dragOver = function dragOver(event) {
			event.preventDefault();

			var box = event.currentTarget,
			    uploaderBox = box.querySelector('.inline-uploader');

			(0, _timers.setTimeout)(function () {
				uploaderBox.classList.add('-droppable');
			}, 1);
		};

		/**
   * Remove box overlay when item is dragged away from box.
   * @param {*} event 
   */
		var dragLeave = function dragLeave(event) {
			var box = event.currentTarget,
			    uploaderBox = box.querySelector('.inline-uploader');

			(0, _timers.setTimeout)(function () {
				uploaderBox.classList.remove('-droppable');
			}, 1);
		};

		/**
   * Open media manager after dropping a file
   * @param {*} event 
   */
		var drop = function drop(event) {
			event.preventDefault();
			files = event.dataTransfer.files;

			var box = event.currentTarget,
			    uploaderBox = box.querySelector('.inline-uploader');

			if (1 > files.length) {
				return;
			}

			if (!uploadManager) {
				var uploadView = void 0;

				uploadManager = wp.media.frames.mahMedia.open();
				uploadView = uploadManager.uploader;

				if (uploadView.uploader && uploadView.uploader.ready) {
					addFiles();
				} else {
					uploadManager.on('uploader:ready', addFiles);
				}
			} else {
				uploadManager.state().reset();

				addFiles();
				uploadManager.open();
			}

			// Restore box to original state.
			uploaderBox.classList.remove('-droppable');
		};

		/**
   * Upload files through the uploader automatically.
   */
		var addFiles = function addFiles() {
			if (1 > files.length) {
				return;
			}

			if (1 < files.length) {
				// Let 'em know only one file per post is allowed.
			}

			uploadManager.uploader.uploader.uploader.addFile(_.toArray(files));

			files = [];
		};

		/**
   * Return functions to share with other components.
   */
		return {
			dragOver: dragOver,
			dragLeave: dragLeave,
			drop: drop
		};
	}();

	document.addEventListener('DOMContentLoaded', window.Mah.Dropper.init);
})();

},{"timers":4}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {
	'use strict';

	// Verify object exists in global scope.

	if ('object' !== _typeof(window.Mah)) {
		window.Mah = {};
	}

	/**
  * Handles uploads within the content type.
  * 
  * @author Mario Aguiar <me@marioaguiar.net>
  */
	window.Mah.MahDownloadsAdmin = function () {
		/**
   * Store variables for future use.
   */
		var cache = {
			box: document.getElementById('mah-attachment'),
			boxContainer: document.getElementById('mah-upload-box'),
			inlineUploaderTmpl: document.getElementById('tmpl-dropper').innerHTML,
			mediaManager: null
		};

		/**
   * Init functionality.
   * Attach events.
   */
		var init = function init() {
			var dropper = window.Mah.Dropper;

			if (!cache.box) {
				return;
			}

			displayBoxes();
			initMediaFrame();

			cache.box.addEventListener('dragover', dropper.dragOver);
			cache.box.addEventListener('dragleave', dropper.dragLeave);
			cache.box.addEventListener('drop', dropper.drop);

			var uploadButton = cache.box.querySelector('.select-files');

			if (uploadButton) {
				uploadButton.addEventListener('click', openUploader);
			}
		};

		/**
   * Create an instance of the media uploader for later use.
   */
		var initMediaFrame = function initMediaFrame() {
			if ('undefined' !== typeof wp && 'undefined' !== typeof wp.media) {
				cache.mediaManager = wp.media.frames.mahMedia = wp.media({
					multiple: false,
					title: mahI18n.boxTitle,
					button: {
						text: mahI18n.button
					}
				});
			}
		};

		/**
   * Only display upload box if there's Javascript enabled.
   * It's 2017 after all.
   * 
   * @return void.
   */
		var displayBoxes = function displayBoxes() {
			cache.boxContainer.style.display = 'block';

			cache.inlineUploaderTmpl = cache.inlineUploaderTmpl.replace('{{dropLabel}}', mahI18n.dropLabel);

			// Append with jQuery so we don't use innerHTML.
			$(cache.box).append(cache.inlineUploaderTmpl);
		};

		var openUploader = function openUploader(event) {
			event.preventDefault();

			cache.mediaManager.open();
		};

		return {
			init: init
		};
	}();

	document.addEventListener('DOMContentLoaded', window.Mah.MahDownloadsAdmin.init);
})(jQuery);

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
},{"process/browser.js":3}]},{},[1,2]);
