( function() {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = ( function() {
		const cache = {
			box                : document.getElementById( 'mah-attachment' ),
			boxContainer       : document.getElementById( 'mah-upload-box' ),
			inlineUploaderTmpl : document.getElementById( 'tmpl-dropper' ).innerHTML
		};

		const init = function() {
			const dropper = window.Mah.Dropper;

			if ( ! cache.box ) {
				return;
			}

			displayBoxes();

			cache.box.addEventListener( 'dragover', dropper.dragOver );
		};

		const displayBoxes = function() {
			// Only display the box if we have JS enabled.
			cache.boxContainer.style.display = 'block';
			
			cache.inlineUploaderTmpl.replace( '{{dropLabel}}', mahI18n.dropLabel );
			cache.box.appendChild( inlineUploaderTmpl );
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )();
