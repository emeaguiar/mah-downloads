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
					title: mahI18n.boxTitle,
					button: {
						text: mahI18n.button
					}
				} );

				cache.mediaManager.on( 'select', attachFile );
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

		/**
		 * Open WP media uploader.
		 * 
		 * @param {*} event - Triggered event.
		 */
		const openUploader = function( event ) {
			event.preventDefault();
			cache.mediaManager.open();
		};

		/**
		 * Populates the hidden field with the attachment ID.
		 * We'll use this to attach a file to a download on save.
		 * 
		 * @param {event} event - Triggered Event
		 */
		const attachFile = function( event ) {
			const attachment = cache.mediaManager.state().get( 'selection' ).first().toJSON(),
				  attachmentField = document.getElementById( 'mah-attachment-id' );

			if ( ! attachmentField ) {
				return;
			}

			attachmentField.value = attachment.id;			
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )( jQuery );
