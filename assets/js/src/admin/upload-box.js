( function() {
	'use strict';

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = ( function() {
		const init = function() {
			const dropper = window.Mah.Dropper,
				  box = document.getElementById( 'mah-attachment' ),
				  boxContainer = document.getElementById( 'mah-upload-box' );

			if ( ! box ) {
				return;
			}

			// Only display the box if we have JS enabled.
			boxContainer.style.display = 'block';

			box.addEventListener( 'dragover', dropper.dragOver );
		};

		return {
			init: init
		};
	} )();

	document.addEventListener( 'DOMContentLoaded', window.Mah.MahDownloadsAdmin.init );
} )();
