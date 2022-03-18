module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{html,png,css,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};