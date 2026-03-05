<?php
/**
 * File purpose and role
 *
 * Adds a WordPress page template fallback for Stripe return URL /payment-success.
 */

/**
 * Section purpose and behavior
 *
 * Render thank-you view for payment-success endpoint and preserve session_id from Stripe.
 */
add_action('template_redirect', 'vogome_render_payment_success_page');

function vogome_render_payment_success_page(): void
{
    if (is_admin()) {
        return;
    }

    $request_path = isset($_SERVER['REQUEST_URI']) ? wp_parse_url(sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])), PHP_URL_PATH) : '';
    if (!is_string($request_path)) {
        return;
    }

    $normalized_path = trim($request_path, '/');
    if ($normalized_path !== 'payment-success') {
        return;
    }

    status_header(200);
    nocache_headers();

    $thankyou_file = ABSPATH . 'ro/thankyou.html';
    if (!file_exists($thankyou_file)) {
        return;
    }

    $thankyou_html = file_get_contents($thankyou_file);
    if ($thankyou_html === false) {
        return;
    }

    $session_id = isset($_GET['session_id']) ? sanitize_text_field(wp_unslash($_GET['session_id'])) : '';
    if ($session_id !== '') {
        $escaped_session = esc_js($session_id);
        $session_script = "<script>window.vogoStripeSessionId='" . $escaped_session . "';</script>";
        $thankyou_html = str_replace('</body>', $session_script . '</body>', $thankyou_html);
    }

    echo $thankyou_html;
    exit;
}
