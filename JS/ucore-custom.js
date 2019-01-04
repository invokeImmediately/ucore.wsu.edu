// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of
// source code

////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM JS CODE SPECIFIC TO THE UCORE WEBSITE

( function ( $ ) {
	"use strict";

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §1: DOCUMENT READY EXECUTION

	$( function () {
		performUrlBasedHtmlAdjustments();
		performPageBasedHandlerBindings();
	} );

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2: FUNCTION DECLARATIONS


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
			$containers.on( 'change', selectors.inputs, function ( e ) {
				$this = $( this );
				$contentContainers = $( selectors.content );
				$contentContainers.addClass( 'for-screen-readers' );
				handleContentSelectionChange( $this );
			} );
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

	/**
	 * Tweak HTML source to work around some quirks of WSUWP template.
	 */
	function performUrlBasedHtmlAdjustments() {
		var siteURL = window.location.pathname;

		switch (siteURL) {
		// case '/':
		// 	$('#menu-item-35').remove();
		// 	$('#spine-sitenav ul li').first().css('border-top', 'none');
		// 	$('#spine-sitenav').addClass('homeless');
		// 	break;
		case '/news/':
			$( 'div.column.one' ).first().parent( 'section' ).before( '<section class="row single g\
utter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class\
="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section><\
/div></section>' );
			break;
		}
	}

} )( jQuery );
