module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-syntax-export-default-from',
		'@babel/plugin-proposal-export-default-from',
		[
			'babel-plugin-root-import',
			{
				paths: [
					{
						rootPathPrefix: '~/',
						rootPathSuffix: 'src'
					},
					{
						rootPathPrefix: 's/',
						rootPathSuffix: 'src/services'
					},
					{
						rootPathPrefix: 'a/',
						rootPathSuffix: 'src/api'
					}
				]
			}
		]
	]
}
