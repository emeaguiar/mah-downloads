import { setTimeout } from "timers";

( function() {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	/**
	 * Helper functions for drag/drop functionality.
	 * 
	 * @author Mario Aguiar (me@marioaguiar.net)
	 */
	window.Mah.Dropper = ( function() {		
		let files,
			mediaManager,
			uploadManager;

		/**
		 * Init variables and housekeeping.
		 */
		const init = function() {
			if ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.media ) {
				mediaManager = wp.media.frames.mahMedia = wp.media();
			}
		};

		/**
		 * Display box when item is dragged to box.
		 * @param {*} event 
		 */
		const dragOver = function( event ) {
			event.preventDefault();
			
			const box = event.currentTarget,
				  uploaderBox = box.querySelector( '.inline-uploader' );

			setTimeout( function() {
				uploaderBox.classList.add( '-droppable' );
			}, 1 );
		};

		/**
		 * Remove box overlay when item is dragged away from box.
		 * @param {*} event 
		 */
		const dragLeave = function( event ) {
			const box = event.currentTarget,
				  uploaderBox = box.querySelector( '.inline-uploader' );

			setTimeout( function() {
				uploaderBox.classList.remove( '-droppable' );
			}, 1 );
		};

		/**
		 * Open media manager after dropping a file
		 * @param {*} event 
		 */
		const drop = function( event ) {
			event.preventDefault();
			files = event.dataTransfer.files;

			if ( 1 > files.length )  {
				return;
			}

			if ( ! uploadManager ) {
				let uploadView;

				uploadManager = mediaManager.open();
				uploadView    = uploadManager.uploader;
			} else {
				uploadManager.state().reset();

				uploadManager.open();
			}
		};

		/**
		 * Return functions to share with other components.
		 */
		return {
			init: init,
			dragOver: dragOver,
			dragLeave: dragLeave,
			drop: drop
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.Dropper.init );
} )();
