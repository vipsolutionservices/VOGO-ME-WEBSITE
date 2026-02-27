<?php
/**
 * Add forum home link near bbPress pagination counts.
 */

add_filter('bbp_get_topic_pagination_count', function ($count) {
    return $count . ' <a class="vogo-forum-home-link" href="https://vogo.me/forums/">Forum home</a>';
}, 20);

add_filter('bbp_get_forum_pagination_count', function ($count) {
    return $count . ' <a class="vogo-forum-home-link" href="https://vogo.me/forums/">Forum home</a>';
}, 20);
