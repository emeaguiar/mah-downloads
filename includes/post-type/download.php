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
	add_action( 'save_post',             $n( 'save_download_file' ) );
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

	$download_file = array_shift( get_download_file( $post ) );

	wp_nonce_field( 'mah_downloads_attachment', 'mah_downloads_attachment_nonce' );
?>

	<div id="mah-upload-box" class="media-frame mode-grid">
		<div id="mah-attachment" class="uploader-inline">
			<?php if ( empty( $download_file ) ) : ?>
				<div class="uploader-inline-content no-upload-message">
					<h2 class="instructions">
						<?php esc_html_e( 'Drag file here or', 'mah_download' ); ?>
					</h2>
					<div class="upload-ui box">
						<a href="#!" class="browser button button-hero select-files">
							<?php esc_html_e( 'Select file', 'mah_download' ); ?>
						</a>
					</div>

					<input type="hidden" id="mah-attachment-id" name="mah-attachment-id" value="">
				</div>
			<?php else : ?>
				<?php
				$size = get_file_size( $download_file );
				$type = get_post_mime_type( $download_file->ID );
				?>
				<div class="downloads">
					<div class="download-preview">
						<div class="image">
							<img src="<?php echo esc_url( home_url( '/wp-includes/images/media/document.png' ) ); ?>" class="icon" draggable="false" alt="">
						</div>

						<div class="details">
							<p class="title">
								<strong><?php esc_html_e( 'Title', 'mah_downloads' ); ?></strong>: 
								<?php echo esc_html( $download_file->post_title ); ?>
							</p>
							<?php if ( ! empty( $size ) ) : ?>
								<p class="size">
									<strong><?php esc_html_e( 'Size', 'mah_downloads' ); ?></strong>: 
									<?php echo esc_html( $size ); ?>
								</p>
							<?php endif; ?>
							<?php if ( ! empty( $type ) ) : ?>
								<p class="type">
									<strong><?php esc_html_e( 'Type', 'mah_downloads' ); ?></strong>: 
									<?php echo esc_html( $type ); ?>
								</p>
							<?php endif; ?>
						</div>
					</div>
				</div>
			<?php endif; ?>
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
		'boxTitle'  => esc_html__( 'Attach file to download', 'mah_download' ),
		'button'    => esc_html__( 'Attach', 'mah_download' ),
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

/**
 * Save attached file relationship.
 * Since attachments are technically post, set a parent/child relationship.
 *
 * @param [type] $post_id - Current post
 * @return void
 */
function save_download_file( $post_id ) {
	$post = get_post( $post_id );

	if ( ! $post ) {
		return;
	}

	// Break these down to make them readable.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	$nonce = filter_input( INPUT_POST, 'mah_downloads_attachment_nonce', FILTER_SANITIZE_STRING );

	if ( ! wp_verify_nonce( $nonce, 'mah_downloads_attachment' ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$file_id = filter_input( INPUT_POST, 'mah-attachment-id', FILTER_SANITIZE_NUMBER_INT );

	wp_update_post( array(
		'ID'          => $file_id,
		'post_parent' => $post->ID,
	) );

	return true;
}

/**
 * Returns cached file attached to download.
 * Saves file in cache if not already.
 *
 * @param WP_Post $post - Current post.
 * @return void|array - Attached file.
 */
function get_download_file( $post ) {
	$post = get_post( $post );

	if ( ! $post ) {
		return;
	}

	$key         = sprintf( 'mah-download-attached-file-%d', absint( $post->ID ) );
	$cached_file = wp_cache_get( $key );

	if ( $cached_file ) {
		return $cached_file;
	}

	$query = new \WP_Query( array(
		'post_type'   => 'attachment',
		'post_parent' => $post->ID,
		'post_status' => 'inherit',
	) );

	$file = $query->posts;

	wp_cache_set( $key, $file );

	return $file;
}

/**
 * Gets a file size and returns it in a readable format.
 *
 * @param WP_Post $file - File to meassure.
 * @return string|bool - Size string, false on failure.
 */
function get_file_size( $file ) {
	$post = get_post( $file );

	if ( ! $post ) {
		return;
	}

	$size_in_bytes = filesize( get_attached_file( $post->ID ) );

	return size_format( $size_in_bytes );
}
