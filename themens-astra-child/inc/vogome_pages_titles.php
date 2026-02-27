<?php
/**
 * Public browser title override from custom field.
 *
 * Custom field key: public_title
 */

add_filter('pre_get_document_title', function ($title) {
    if (is_admin() || !is_singular('page')) {
        return $title;
    }

    $id = get_queried_object_id();
    if (!$id) {
        return $title;
    }

    $public_title = get_post_meta($id, 'public_title', true);
    if (!empty($public_title)) {
        return wp_strip_all_tags($public_title);
    }

    return $title;
}, 20);
