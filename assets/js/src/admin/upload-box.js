( function( window, undefined ) {
	"use strict";

	// Verify object exists in global scope.
	if ( 'object' !== typeof window.Mah ) {
		window.Mah = {};
	}

	window.Mah.MahDownloadsAdmin = ( function() {
		const init = function() {
			console.log( 'init admin' );
		};

		return {
			init: init
		};
	} )();
} )( this );