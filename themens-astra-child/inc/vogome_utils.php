<?php
/**
 * VOGO utility includes.
 */

$vogome_inc_files = [
    '/inc/vogome_enqueue.php',
    '/inc/vogome_bbpress_header.php',
    '/inc/vogome_bbpress_topbar.php',
    '/inc/vogome_bbpress_pagination.php',
    '/inc/vogome_activate_plan.php',
    '/inc/vogome_pages_titles.php',
    '/inc/vogome_checkout_events.php',
    '/inc/vogome_enterprise_contact.php',
];

foreach ($vogome_inc_files as $vogome_inc_file) {
    $vogome_inc_path = get_stylesheet_directory() . $vogome_inc_file;
    if (file_exists($vogome_inc_path)) {
        require_once $vogome_inc_path;
    }
}
