// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of
// source code

////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM JS CODE SPECIFIC TO THE UCORE WEBSITE

( function ( $ ) {

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////
// §1: DOCUMENT READY EXECUTION

$( function () {
	var htmlNewsHeader = '<section class="row halves article-header" style="height: 142px;"><div st\
yle="" class="column one "><div class="wrapper"><h1><span class="shrink-text-on-tablet">News</span>\
</h1></div></div><div style="background-image:url(\'https://s3.wp.wsu.edu/uploads/sites/1303/2019/0\
6/art_news-pages_475x230.jpg\');" class="column two "></div></section>';

	addPageHeaderOnNewsPages( htmlNewsHeader );
	performPageBasedHandlerBindings();
} );

////////////////////////////////////////////////////////////////////////////////////////////////
// §2: FUNCTION DECLARATIONS

/**
 * Add page headers to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addPageHeaderOnNewsPages( htmlNewsHeader ) {
	aPHONP_addHeaderViaLocation( htmlNewsHeader );
	aPHONP_addHeaderViaClassUtilization( htmlNewsHeader );
}

/**
 * Use the browser's location to add a header to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function aPHONP_addHeaderViaLocation( htmlNewsHeader ) {
	var siteURL = window.location.pathname;
	switch( siteURL ) {
		case '/news/':
			$( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
			break;
	}	
}

/**
 * Inspect the body tag to add a header to news pages when certain classes are in use.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function aPHONP_addHeaderViaClassUtilization( htmlNewsHeader ) {
	var $body = $( 'body' ).first();
	if ( $body.hasClass( 'single-post' ) ) {
		$body.find( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
	}
}

function bindContentFocusHandler( $contentContainers, $containers, selectors ) {
	$contentContainers.on( 'focusin', '*', function() {
		var $inputs;
		var $this;
		var $thisInput;
		var $thisParent;
		var inputId;
		var thisId;
		var idFound;

		$this = $( this );
		$thisParent = $this.parents( selectors.content );
		if ( $thisParent.hasClass( 'for-screen-readers' ) ) {
			thisId = $thisParent[0].id;
			$inputs = $containers.find( 'input' );
			idFound = false;
			$inputs.each( function() {
				if ( !idFound ) {
					$thisInput = $( this );
					inputId = $thisInput.val();
					if ( inputId == thisId ) {
						idFound = true;
					}
				}
			} );
			if ( idFound ) {
				$thisInput.prop( 'checked', true).trigger( 'change' );
			}
		}
	} );
}

/**
 * Handle content selection changes on the Proposing and Renewing a UCORE course page.
 */
function handleContentSelectionChange ( $this ) {
	var $content;
	var isChecked;
	var selector;
	var value;

	isChecked = $this.prop( 'checked' );
	value = $this.val();
	selector = '#' + value;
	$content = $( selector );
	if ( isChecked ) {
		$content.removeClass( 'for-screen-readers' );
	}
}

/**
 * Initialize content selection controls on the Proposing and Renewing a UCORE course page.
 */
function initContentSelectorOnCourseProposalsPage( selectors ) {
	var $containers;
	var $contentContainers;
	var $inputs;
	var $page;
	var $this;
	var proceed;

	$page = $( '.page' + selectors.page );
	proceed = $page.length;
	if ( proceed ) {
		$containers = $page.find( selectors.container );
		$contentContainers = $( selectors.content );
		$containers.on( 'change', selectors.inputs, function ( e ) {
			$this = $( this );
			$contentContainers.addClass( 'for-screen-readers' );
			handleContentSelectionChange( $this );
		} );
		bindContentFocusHandler( $contentContainers, $containers, selectors );
	}
}

/**
 * Establish per-page event bindings, where pages are determined through body classes.
 */
function performPageBasedHandlerBindings() {
	initContentSelectorOnCourseProposalsPage( {
		page: '.proposing-and-renewing-courses',
		container: '.selected-content',
		inputs: '.selected-content__choice',
		content: '.selected-content__content'
	} );
}

} )( jQuery );
