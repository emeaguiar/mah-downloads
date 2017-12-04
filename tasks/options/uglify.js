module.exports = {
	all: {
		files: {
			'assets/js/mah-downloads.min.js': ['assets/js/mah-downloads.js']
		},
		options: {
			banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
			' * <%= pkg.homepage %>\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
			' * Licensed GPLv2+' +
			' */\n',
			mangle: {
				except: ['jQuery']
			}
		}
	}
};