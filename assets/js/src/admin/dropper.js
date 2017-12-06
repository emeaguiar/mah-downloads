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
		 * Return functions to share with other components.
		 */
		return {
			init: init,
			dragOver: dragOver,
			dragLeave: dragLeave
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.Dropper.init );
} )();
