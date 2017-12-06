import { setTimeout } from "timers";

( function() {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	window.Mah.Dropper = ( function() {
		let isOverDropZone = false,
			isOverContainer = false;

		const init = function() {

		};

		const dragOver = function( event ) {
			event.preventDefault();
			
			let box = event.currentTarget,
				uploaderBox = box.querySelector( '.inline-uploader' );

			uploaderBox.classList.add( '-droppable' );
			isOverDropZone = true;

			setTimeout( refresh, 1 );
		};

		const refresh = function() {
			const inlineUploader = document.querySelector( '.inline-uploader' );

			if ( ! inlineUploader ) {
				return;
			}

			if ( isOverDropZone || isOverContainer ) {

			}
		};

		return {
			init: init,
			dragOver: dragOver
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.Dropper.init );
} )();
