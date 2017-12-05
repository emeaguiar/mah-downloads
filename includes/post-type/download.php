<?php
/**
 * Downloads post type
 * 
 * @package Mah_Downloads
 */

namespace Mah\Mah_Downloads\Post_Type\Download;

/**
 * Attach hooks.
 * 
 * @since 1.0
 * 
 * @uses add_action()
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	// Register post type.
	add_action( 'init', $n( 'register' ) );
}

/**
 * Register mah-download post type
 * 
 * @since 1.0
 * 
 * @uses register_post_type()
 *
 * @return void
 */
function register() {
	$labels = array(
		'name'               => esc_html__( 'Downloads', 'mah_downloads' ),
		'singular_name'      => esc_html__( 'Download', 'mah_download' ),
		'add_new'            => esc_html__( 'Add new Download', 'mah_download' ),
		'add_new_item'       => esc_html__( 'Add new Download', 'mah_download' ),
		'new_item'           => esc_html__( 'New Download', 'mah_download' ),
		'edit_item'          => esc_html__( 'Edit Download', 'mah_download' ),
		'view_item'          => esc_html__( 'View Download', 'mah_download' ),
		'all_items'          => esc_html__( 'All Downloads', 'mah_download' ),
		'search_items'       => esc_html__( 'Search Downloads', 'mah_download' ),
		'not_found'          => esc_html__( 'No Downloads found', 'mah_download' ),
		'not_found_in_trash' => esc_html__( 'No Downloads found in Thrash', 'mah_downloads' ),
	);

	$args = array(
		'public'             => true,
		'publicly_queryable' => true,
		'label'              => esc_html__( 'Download', 'mah_download' ),
		'labels'             => $labels,
		'supports'           => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'          => 'dashicons-download',
		'rewrite'            => array( 'slug' => 'download', 'with_front' => false ),
	);

	register_post_type( 'mah-download', $args );
}
