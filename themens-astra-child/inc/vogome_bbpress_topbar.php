<?php
/**
 * Topic top bar for bbPress single topic pages.
 */

add_action('bbp_before_main_content', function () {
    if (!is_singular('topic')) {
        return;
    }

    if (!function_exists('bbp_get_topic_forum_id')) {
        return;
    }

    $home_forum_url = home_url('/forum/');

    $topic_id   = get_the_ID();
    $forum_id   = bbp_get_topic_forum_id($topic_id);
    $topic_date = get_post_field('post_date', $topic_id);

    $q = new WP_Query([
        'post_type'      => 'topic',
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'orderby'        => 'date',
        'order'          => 'ASC',
        'post_parent'    => (int) $forum_id,
        'date_query'     => [[
            'after'     => $topic_date,
            'inclusive' => false,
        ]],
        'no_found_rows'  => true,
    ]);

    $next_url = ($q->have_posts()) ? get_permalink($q->posts[0]->ID) : '';
    wp_reset_postdata();

    echo '<div class="vogo-topic-topbar">';
    echo '<div class="vogo-topic-topbar-left">';
    echo '<a class="vogo-topic-home" href="' . esc_url($home_forum_url) . '">Home Forum</a>';
    echo '</div>';

    echo '<div class="vogo-topic-topbar-right">';
    ob_start();
    if (function_exists('bbp_get_search_form')) {
        bbp_get_search_form();
    }
    echo ob_get_clean();

    if (!empty($next_url)) {
        echo '<a class="vogo-topic-next" href="' . esc_url($next_url) . '" rel="next">Next Topic</a>';
    }
    echo '</div>';
    echo '</div>';
}, 5);
