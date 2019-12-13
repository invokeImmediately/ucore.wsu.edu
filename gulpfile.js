'use strict';

/* -------------------------------------------------------------------------------------------------
** Variable Declarations
*/

// Gulp task dependencies
var cleanCss = require( 'gulp-clean-css' );
var concat = require( 'gulp-concat' );
var extName = require( 'gulp-extname' );
var gcmq = require( 'gulp-group-css-media-queries' );
var gulp = require( 'gulp' );
var insert = require( 'gulp-insert' );
var insertLines = require( 'gulp-insert-lines' );
var lessc = require( 'gulp-less' );
var replace = require( 'gulp-replace' );
var uglifyJs = require( 'gulp-uglify' );
var pump = require( 'pump' );

/* -------------------------------------------------------------------------------------------------
** Function declarations
*/

function getCssBuildSettings() {
	return {
		commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm,
		dependenciesPath: './WSU-UE---CSS/',
		destFolder: './CSS/',
		fontImportStr: '@import url(\'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,4\
00,400i,700,700i|Roboto+Condensed:400,400i,700,700i|PT+Serif:400,400i,700,700i|Roboto+Mono:400,400i\
,700,700i&display=swap\');\r\n',
		insertingMediaQuerySectionHeader: {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		},
		minCssFileExtension: '.min.css',
		minCssFileHeaderStr: '/*! Built with the LESS CSS preprocessor [http://lesscss.org/]. Pleas\
e see [https://github.com/invokeImmediately/ucore.wsu.edu] for a repository of fully documented sou\
rce code. */\r\n',
		sourceFile: './CSS/ucore-custom.less'
	};
}

function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./JS/ucore-custom.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jQuery.masonry-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'ucore-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: fixFileHeaderComments
	};
}

function fixFileHeaderComments ( match, p1, offset, string ) {
	var replacementStr = match;
	if ( offset == 0 ) {
		replacementStr = '/*!';
	}
	return replacementStr;
}

function setUpCssBuildTask( settings ) {
	gulp.task( 'buildMinCss', function ( callBack ) {
		pump( [
				gulp.src( settings.sourceFile ),
				lessc( {
					paths: [settings.dependenciesPath]
				} ),
				replace( settings.commentRemovalNeedle, '' ),
				insert.prepend( settings.fontImportStr ),
				insert.prepend( settings.minCssFileHeaderStr ),
				gulp.dest( settings.destFolder ),
				gcmq(),
				insertLines( settings.insertingMediaQuerySectionHeader ),
				cleanCss(),
				extName( settings.minCssFileExtension ),
				gulp.dest( settings.destFolder )
			],
			callBack
		);
	} );
}

function setUpJsBuildTask( settings ) {
	gulp.task( 'buildMinJs', function ( callBack ) {
		pump( [
				gulp.src( settings.buildDependenciesList ),
				replace( settings.commentNeedle, settings.replaceCallback ),
				concat( settings.compiledJsFileName ),
				gulp.dest( settings.destFolder ),
				uglifyJs( {
					output: {
						comments: /^!/
					},
					toplevel: true,
				} ),
				extName( settings.minJsFileExtension ),
				gulp.dest( settings.destFolder )
			],
			callBack
		);
	} );
}

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

setUpCssBuildTask( getCssBuildSettings() );
setUpJsBuildTask( getJsBuildSettings() );
