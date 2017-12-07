( function( $ ) {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	/**
	 * Handles uploads within the content type.
	 * 
	 * @author Mario Aguiar <me@marioaguiar.net>
	 */
	window.Mah.MahDownloadsAdmin = ( function() {
		/**
		 * Store variables for future use.
		 */
		const cache = {
			box                : document.getElementById( 'mah-attachment' ),
			boxContainer       : document.getElementById( 'mah-upload-box' ),
			inlineUploaderTmpl : document.getElementById( 'tmpl-dropper' ).innerHTML,
			mediaManager       : null
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
			initMediaFrame();

			cache.box.addEventListener( 'dragover',  dropper.dragOver );
			cache.box.addEventListener( 'dragleave', dropper.dragLeave );
			cache.box.addEventListener( 'drop',      dropper.drop );

			const uploadButton = cache.box.querySelector( '.select-files' );

			if ( uploadButton ) {
				uploadButton.addEventListener( 'click', openUploader );
			}
		};

		/**
		 * Create an instance of the media uploader for later use.
		 */
		const initMediaFrame = function() {
			if ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.media ) {
				cache.mediaManager = wp.media.frames.mahMedia = wp.media( {
					multiple: false,
					title: mahI18n.title,
					button: {
						text: mahI18n.button
					}
				} );
			}
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

		const openUploader = function( event ) {
			event.preventDefault();

			cache.mediaManager.open();
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )( jQuery );
