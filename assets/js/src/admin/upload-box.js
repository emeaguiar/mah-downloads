( function() {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = ( function() {
		const init = function() {
			const dropper = window.Mah.Dropper,
				  box = document.getElementById( 'mah-attachment' );

			if ( ! box ) {
				return;
			}

			box.addEventListener( 'dragover', dropper.dragOver );
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )();
