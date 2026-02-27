<?php
/**
 * Enqueue child theme assets.
 */

add_action('wp_enqueue_scripts', function () {
    $css_file = get_stylesheet_directory() . '/style.css';
    $ver      = file_exists($css_file) ? filemtime($css_file) : time();

    wp_enqueue_style('astra-child-style', get_stylesheet_uri(), [], $ver);
}, 20);
