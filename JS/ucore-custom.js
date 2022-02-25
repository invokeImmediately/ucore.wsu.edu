/*-*************************************************************************************************
 * █  █ ▄▀▀▀ ▄▀▀▄ █▀▀▄ █▀▀▀    ▄▀▀▀ █  █ ▄▀▀▀▐▀█▀▌▄▀▀▄ ▐▀▄▀▌      █ ▄▀▀▀
 * █  █ █    █  █ █▄▄▀ █▀▀  ▀▀ █    █  █ ▀▀▀█  █  █  █ █ ▀ ▌   ▄  █ ▀▀▀█
 *  ▀▀   ▀▀▀  ▀▀  ▀  ▀▄▀▀▀▀     ▀▀▀  ▀▀  ▀▀▀   █   ▀▀  █   ▀ ▀ ▀▄▄█ ▀▀▀
 *
 * Custom JS code specific to the website of the UCORE program at Washington State University (WSU).
 *
 * @version 1.1.0
 *
 * @author Daniel C. Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 * @link https://github.com/invokeImmediately/ucore.wsu.edu/blob/master/ucore-custom.js
 * @license MIT - Copyright (c) 2022 Washington State University
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *     and associated documentation files (the “Software”), to deal in the Software without
 *     restriction, including without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 *     Software is furnished to do so, subject to the following conditions:
 *   The above copyright notice and this permission notice shall be included in all copies or
 *     substantial portions of the Software.
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *     BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of
// source code

////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM JS CODE SPECIFIC TO THE UCORE WEBSITE

( function ( $ ) {

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////
// §1: DOCUMENT READY EXECUTION

$( function () {
  const htmlNewsHeader = '<section class="row halves article-header" style="height: 142px;"><div style="" class="column one "><div class="wrapper"><h1><span class="shrink-text-on-tablet">News</span></h1></div></div><div style="background-image:url(\'https://s3.wp.wsu.edu/uploads/sites/1303/2019/06/art_news-pages_475x230.jpg\');" class="column two "></div></section>';
  const htmlBlogHeader = '<section class="row halves article-header" style="height: 142px;"><div style="" class="column one "><div class="wrapper"><h1><span class="shrink-text-on-tablet">From the Director</span></h1></div></div><div style="background-image:url(\'https://s3.wp.wsu.edu/uploads/sites/1303/2022/02/art_blog-pages_475w230h.jpg\');" class="column two "></div></section>';

  addPageHeaderOnNewsPages( htmlNewsHeader );
  addPageHeaderOnBlogPages( htmlBlogHeader );
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
  addNewsPgHdrViaLctn( htmlNewsHeader );
  addNewsPpHdrViaClasses( htmlNewsHeader );
}

/**
 * Use the browser's location to add a header to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addNewsPgHdrViaLctn( htmlNewsHeader ) {
  // Add the missing page header to news post archive.
  const siteURL = window.location.pathname;
  switch( siteURL ) {
    case '/news/':
      $( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
      break;
    case '/category/news-post/':
      $( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
      break;
  } 
}

/**
 * Inspect the body tag to add a header to news pages when certain classes are in use.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addNewsPpHdrViaClasses( htmlNewsHeader ) {
  // Add the missing page header to single news posts.
  const $body = $( 'body' ).first();
  if ( $body.hasClass( 'single-post' ) && $body.hasClass( 'categorized-news-post' ) ) {
    $body.find( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
  }
}

function addPageHeaderOnBlogPages( htmlBlogHeader ) {
  addBlogPgHdrViaLctn( htmlBlogHeader );
  addBlogPpHdrViaClasses( htmlBlogHeader );
}

function addBlogPgHdrViaLctn( htmlBlogHeader ) {
  // Add the missing page header to blog post archive.
  const siteURL = window.location.pathname;
  switch( siteURL ) {
    case '/category/blog-post/':
      $( '.column.one' ).first().parent( '.row' ).before( htmlBlogHeader );

      // Update active menu item dogearing within the Spine menu.
      dogearBlogMenuItem();
      break;
  }

}

function addBlogPpHdrViaClasses( htmlBlogHeader ) {
  // Add the missing page header to single blog posts.
  const $body = $( 'body' ).first();
  if ( $body.hasClass( 'single-post' ) && $body.hasClass( 'categorized-blog-post' ) ) {
    $body.find( '.column.one' ).first().parent( '.row' ).before( htmlBlogHeader );

    // Update active menu item dogearing within the Spine menu.
    dogearBlogMenuItem();
  }
}

function dogearBlogMenuItem() {
  // Update active menu item dogearing within the Spine menu.
  const $newsMenuItem = $( '#menu-item-3843' );
  const $blogMenuItem = $( '#menu-item-3931' );
  $newsMenuItem.removeClass( 'active dogeared' );
  $blogMenuItem.addClass( 'active dogeared' );
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
