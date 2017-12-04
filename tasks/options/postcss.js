module.exports = {
	dist: {
		options: {
			processors: [
				require('autoprefixer')({browsers: 'last 2 versions'})
			]
		},
		files: { 
			'assets/css/mah-downloads.css': [ 'assets/css/mah-downloads.css' ]
		}
	}
};