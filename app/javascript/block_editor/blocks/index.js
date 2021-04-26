/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import { registerCoreBlocks } from '@wordpress/block-library'
import '@wordpress/block-editor';
import {
  registerBlockType,
  unregisterBlockType,
  registerBlockStyle,
  unregisterBlockStyle,
  unregisterBlockVariation
} from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose'
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ColumnEdit from './column/edit';
import ButtonEdit from './button/edit';
import ImageEdit from './image/edit';
import MediaUpload from '../components/media-upload';

// import * as accordion from './be-accordion';
import * as callout from './be-alert';
import * as card from './be-card';
import * as cover from './be-cover';
// import * as recentPosts from './recent-posts';
import * as contactForm from './be-contact-form';

export const registerBlocks = () => {
  const replaceButtonBlockEdit = ( settings, name ) => {
    if ( name !== 'core/button' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: ButtonEdit, // Removes & replaces some styling options
      attributes: assign( {}, settings.attributes, {
        hasHollowStyle: {
          type: 'boolean',
          default: false
        },
        hasLargeStyle: {
          type: 'boolean',
          default: false
        }
      })
    } );
  }

  const replaceColumnBlockEdit = ( settings, name ) => {
    if ( name !== 'core/column' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: ColumnEdit // Removes column width options
    } );
  }

  const replaceImageBlockEdit = ( settings, name ) => {
    if ( name !== 'core/image' ) {
      return settings;
    }

    return assign( {}, settings, {
      edit: ImageEdit // Removes ImageSizeControl options
    } );
  }

  const withClientIdClassName = createHigherOrderComponent( ( BlockListBlock ) => {
    return ( props ) => {
      if ( props.name !== 'core/button' ) {
        return <BlockListBlock { ...props } />;
      }

      let classNames = '';
      if (props.attributes.hasLargeStyle) {
        classNames = classnames( classNames, 'large' );
      }

      if (props.attributes.hasHollowStyle) {
        classNames = classnames( classNames, 'is-style-hollow' );
      }

      return <BlockListBlock { ...props } className={ classNames } />;
    };
  }, 'withClientIdClassName' );

  const replaceMediaUpload = () => MediaUpload;

  addFilter(
    'editor.BlockListBlock',
    'block-editor/filters/core-button-block-list',
    withClientIdClassName
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-button',
    replaceButtonBlockEdit
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-column',
    replaceColumnBlockEdit
  );

  addFilter(
    'blocks.registerBlockType',
    'block-editor/filters/core-image',
    replaceImageBlockEdit
  );

  addFilter(
    'editor.MediaUpload',
    'block-editor/filters/media-upload',
    replaceMediaUpload
  );

  // Register WP blocks
  registerCoreBlocks();

  // Unregister WP blocks which are not supported
  unregisterBlockType('core/gallery');
  unregisterBlockType('core/quote');
  unregisterBlockType('core/shortcode');
  unregisterBlockType('core/archives');
  unregisterBlockType('core/audio');
  unregisterBlockType('core/calendar');
  unregisterBlockType('core/categories');
  unregisterBlockType('core/code');
  unregisterBlockType('core/cover');
  unregisterBlockType('core/embed');
  unregisterBlockType('core-embed/twitter');
  unregisterBlockType('core-embed/youtube');
  unregisterBlockType('core-embed/facebook');
  unregisterBlockType('core-embed/instagram');
  unregisterBlockType('core-embed/wordpress');
  unregisterBlockType('core-embed/soundcloud');
  unregisterBlockType('core-embed/spotify');
  unregisterBlockType('core-embed/flickr');
  unregisterBlockType('core-embed/vimeo');
  unregisterBlockType('core-embed/animoto');
  unregisterBlockType('core-embed/cloudup');
  unregisterBlockType('core-embed/collegehumor');
  unregisterBlockType('core-embed/crowdsignal');
  unregisterBlockType('core-embed/dailymotion');
  unregisterBlockType('core-embed/hulu');
  unregisterBlockType('core-embed/imgur');
  unregisterBlockType('core-embed/issuu');
  unregisterBlockType('core-embed/kickstarter');
  unregisterBlockType('core-embed/meetup-com');
  unregisterBlockType('core-embed/mixcloud');
  unregisterBlockType('core-embed/polldaddy');
  unregisterBlockType('core-embed/reddit');
  unregisterBlockType('core-embed/reverbnation');
  unregisterBlockType('core-embed/screencast');
  unregisterBlockType('core-embed/scribd');
  unregisterBlockType('core-embed/slideshare');
  unregisterBlockType('core-embed/smugmug');
  unregisterBlockType('core-embed/speaker');
  unregisterBlockType('core-embed/speaker-deck');
  unregisterBlockType('core-embed/tiktok');
  unregisterBlockType('core-embed/ted');
  unregisterBlockType('core-embed/tumblr');
  unregisterBlockType('core-embed/videopress');
  unregisterBlockType('core-embed/wordpress-tv');
  unregisterBlockType('core-embed/amazon-kindle');
  unregisterBlockType('core/file');
  unregisterBlockType('core/media-text');
  unregisterBlockType('core/latest-comments');
  unregisterBlockType('core/latest-posts');
  unregisterBlockType('core/more');
  unregisterBlockType('core/nextpage');
  unregisterBlockType('core/preformatted');
  unregisterBlockType('core/pullquote');
  unregisterBlockType('core/rss');
  unregisterBlockType('core/search');
  // unregisterBlockType('core/reusable-block'); // ?
  // unregisterBlockType('core/reusable'); // ?
  unregisterBlockType('core/social-links');
  unregisterBlockType('core/social-link');
  unregisterBlockType('core/spacer');
  unregisterBlockType('core/subhead');
  unregisterBlockType('core/tag-cloud');
  unregisterBlockType('core/text-columns');
  unregisterBlockType('core/verse');
  unregisterBlockType('core/video');

  // Unregister WP block styles
  unregisterBlockStyle('core/separator', 'wide');
  unregisterBlockStyle('core/button', 'fill');
  unregisterBlockStyle('core/button', 'outline');
  unregisterBlockStyle('core/image', 'default');
  unregisterBlockStyle('core/image', 'rounded');
  unregisterBlockStyle('core/table', 'regular');
  unregisterBlockStyle('core/table', 'stripes');

  // Unregister WP block variations
  unregisterBlockVariation('core/columns', 'two-columns-one-third-two-thirds');
  unregisterBlockVariation('core/columns', 'two-columns-two-thirds-one-third');
  unregisterBlockVariation('core/columns', 'three-columns-wider-center');

  // Register custom blocks
  // registerBlockType(accordion.name, accordion.settings);
  registerBlockType(callout.name, callout.settings);
  registerBlockType(card.name, card.settings);
  registerBlockType(contactForm.name, contactForm.settings);
  registerBlockType(cover.name, cover.settings);
  // registerBlockType(recentPosts.name, recentPosts.settings);

  // Register custom block styles
  registerBlockStyle( 'core/button', {
    name: 'primary',
    label: 'Primary',
    isDefault: true
  } );
  registerBlockStyle( 'core/button', {
    name: 'secondary',
    label: 'Secondary'
  } );
  registerBlockStyle( 'core/button', {
    name: 'outline-primary',
    label: 'Primary (Outlined)'
  } );
  registerBlockStyle( 'core/button', {
    name: 'outline-secondary',
    label: 'Secondary (Outlined)'
  } );
  registerBlockStyle( 'core/table', {
    name: 'striped',
    label: 'Striped',
    isDefault: true
  } );
  registerBlockStyle( 'core/table', {
    name: 'unstriped',
    label: 'Unstriped'
  } );
  registerBlockStyle( 'core/image', {
    name: 'default',
    label: 'Default',
    isDefault: true
  } );
  registerBlockStyle( 'core/image', {
    name: 'padded',
    label: 'Padded'
  } );
  registerBlockStyle( 'core/columns', {
    name: 'no-stack',
    label: 'No Stacking'
  } );
};
