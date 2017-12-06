( function( $ ) {
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

		/**
		 * Init functionality.
		 * Attach events.
		 */
		const init = function() {
			const dropper = window.Mah.Dropper;

			if ( ! cache.box ) {
				return;
			}

			displayBoxes();

			cache.box.addEventListener( 'dragover', dropper.dragOver );
			cache.box.addEventListener( 'dragleave', dropper.dragLeave );
		};

		/**
		 * Only display upload box if there's Javascript enabled.
		 * It's 2017 after all.
		 * 
		 * @return void.
		 */
		const displayBoxes = function() {
			cache.boxContainer.style.display = 'block';
			
			cache.inlineUploaderTmpl = cache.inlineUploaderTmpl.replace( '{{dropLabel}}', mahI18n.dropLabel );
			
			// Append with jQuery so we don't use innerHTML.
			$( cache.box ).append( cache.inlineUploaderTmpl );
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )( jQuery );
