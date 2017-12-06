module.exports = {
	options: {
		transform: [['babelify', { presets: "env", compact: false }]],
		browserifyOptions: {
			debug: false
		},
		stripBanners: true,
			banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
		' * <%= pkg.homepage %>\n' +
		' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
		' * Licensed GPLv2+' +
		' */\n'
	},
	
	dist: {
		files: {
			'assets/js/mah-downloads.js': 'assets/js/src/mah-downloads.js'
		}
	},

	admin: {
		files: {
			'assets/js/mah-downloads-admin.js': [ 'assets/js/src/admin/*.js' ]
		}
	}
};