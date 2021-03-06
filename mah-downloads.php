<?php
/**
 * Plugin Name: Mah Downloads
 * Plugin URI:  https://github.com/emeaguiar/mah-downloads
 * Description: Download manager for the new era
 * Version:     1.0
 * Author:      Mario Aguiar
 * Author URI:  http://marioaguiar.net
 * License:     GPLv2+
 * Text Domain: mah_downloads
 * Domain Path: /languages
 */

/**
 * Copyright (c) 2015 Mario Aguiar (email : me@marioaguiar.net)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/**
 * Built using yo wp-make:plugin
 * Copyright (c) 2015 10up, LLC
 * https://github.com/10up/generator-wp-make
 */

// Useful global constants
define( 'MAH_DOWNLOADS_VERSION', '0.1.0' );
define( 'MAH_DOWNLOADS_URL',     plugin_dir_url( __FILE__ ) );
define( 'MAH_DOWNLOADS_PATH',    dirname( __FILE__ ) . '/' );
define( 'MAH_DOWNLOADS_INC',     MAH_DOWNLOADS_PATH . 'includes/' );

// Include files
require_once MAH_DOWNLOADS_INC . 'functions/core.php';
require_once MAH_DOWNLOADS_INC . 'post-type/download.php';


// Activation/Deactivation
register_activation_hook( __FILE__, 'Mah\Mah_Downloads\Core\activate' );
register_deactivation_hook( __FILE__, 'Mah\Mah_Downloads\Core\deactivate' );

// Bootstrap
Mah\Mah_Downloads\Core\setup();
Mah\Mah_Downloads\Post_Type\Download\setup();
