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
	 * @author Mario Aguiar <me@marioaguiar.net>
	 */
	window.Mah.Dropper = ( function() {		
		let files,
			uploadManager;

		/**
		 * Display box when item is dragged to box.
		 * @param {event} event - Triggered Event
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

			const box = event.currentTarget,
				  uploaderBox = box.querySelector( '.inline-uploader' );

			if ( 1 > files.length )  {
				return;
			}

			if ( ! uploadManager ) {
				let uploadView;

				uploadManager = wp.media.frames.mahMedia.open();
				uploadView    = uploadManager.uploader;

				if ( uploadView.uploader && uploadView.uploader.ready ) {
					addFiles();
				} else {
					uploadManager.on( 'uploader:ready', addFiles );
				}
			} else {
				uploadManager.state().reset();

				addFiles();
				uploadManager.open();
			}

			// Restore box to original state.
			uploaderBox.classList.remove( '-droppable' );
		};

		/**
		 * Upload files through the uploader automatically.
		 */
		const addFiles = function() {
			if ( 1 > files.length ) {
				return;
			}

			uploadManager.uploader.uploader.uploader.addFile( _.toArray( files ) );

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
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.Dropper.init );
} )();
