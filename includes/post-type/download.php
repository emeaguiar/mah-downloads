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
	add_action( 'init',                  $n( 'register' ) );
	add_action( 'edit_form_after_title', $n( 'add_attachment_metabox' ) );
	add_action( 'admin_enqueue_scripts', $n( 'enqueue_scripts' ) );
	add_action( 'admin_enqueue_scripts', $n( 'enqueue_styles' ) );
	add_action( 'admin_footer',          $n( 'print_dropper_template' ) );
}

/**
 * Register mah-download post type
 *
 * @since 1.0
 *
 * @uses register_post_type()
 * @uses esc_html__()
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

/**
 * Create an inline upload box below title and above content.
 *
 * @since 1.0
 *
 * @uses get_post()
 * @uses wp_nonce_field()
 * @uses esc_html_e()
 *
 * @param WP_Post $post Current post object.
 * @return void
 */
function add_attachment_metabox( $post ) {
	$post = get_post( $post );

	if ( empty( $post ) || 'mah-download' !== $post->post_type ) {
		return;
	}

	wp_nonce_field( 'mah_downloads_attachment', 'mah_downloads_attachment_nonce' );
?>

	<div id="mah-upload-box" class="media-frame mode-grid">
		<div id="mah-attachment" class="uploader-inline">
			<div class="uploader-inline-content no-upload-message">
				<h2 class="upload-instructions">
					<?php esc_html_e( 'Drag file here or', 'mah_download' ); ?>
				</h2>
				<div class="upload-ui">
					<a href="#!" class="browser button button-hero select-files">
						<?php esc_html_e( 'Select file', 'mah_download' ); ?>
					</a>
				</div>

				<input type="hidden" id="mah-attachment-id" name="mah-attachment-id" value="">
			</div>
		</div>
	</div>
<?php
}

/**
 * Enqueue scripts in the admin.
 *
 * @since 1.0
 *
 * @uses wp_enqueue_script()
 * @uses wp_localize_script()
 * @uses esc_html__()
 *
 * @return void
 */
function enqueue_scripts() {
	wp_enqueue_script( 'mah-downloads-admin', MAH_DOWNLOADS_URL . '/assets/js/mah-downloads-admin.js', array( 'jquery' ), MAH_DOWNLOADS_VERSION, true );

	$mah_i18n_strings = array(
		'dropLabel' => esc_html__( 'Drop one file to be uploaded', 'mah_download' ),
	);
	wp_localize_script( 'mah-downloads-admin', 'mahI18n', $mah_i18n_strings );
}

/**
 * Enqueue css styles.
 *
 * @since 1.0
 *
 * @uses wp_enueue_styles()
 *
 * @return void
 */
function enqueue_styles() {
	wp_enqueue_style( 'mah-downloads-admin', MAH_DOWNLOADS_URL . '/assets/css/mah-downloads-admin.css', array(), MAH_DOWNLOADS_VERSION );
}

/**
 * Print template to be used in JS.
 *
 * @since 1.0
 *
 * @uses get_post()
 *
 * @return void
 */
function print_dropper_template() {
	$post = get_post();

	if ( ! $post || 'mah-download' !== $post->post_type ) {
		return;
	}
?>
	<script type="text/template" id="tmpl-dropper">
		<div class="inline-uploader" id="mah-inline-uploader">
			<div class="content">
				<span class="title">
					{{dropLabel}}
				</span>
			</div>
		</div>
	</script>
<?php
}
