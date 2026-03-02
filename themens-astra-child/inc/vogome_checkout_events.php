<?php
/**
 * Checkout event notifier.
 *
 * Sends operational emails to adrian@vogo.family when users enter checkout
 * and when payment result signals are received.
 */

add_action('wp_ajax_vogome_checkout_event', 'vogome_checkout_event');
add_action('wp_ajax_nopriv_vogome_checkout_event', 'vogome_checkout_event');

function vogome_checkout_event(): void
{
    $event_type = sanitize_text_field($_POST['event_type'] ?? 'unknown');
    $package_code = sanitize_text_field($_POST['package_code'] ?? '');
    $billing_cycle = sanitize_text_field($_POST['billing_cycle'] ?? '');
    $payment_status = sanitize_text_field($_POST['payment_status'] ?? '');
    $checkout_url = esc_url_raw($_POST['checkout_url'] ?? '');
    $metadata = wp_kses_post(wp_unslash($_POST['metadata'] ?? '{}'));

    $subject = sprintf('VOGO Checkout Event: %s', strtoupper($event_type));

    $body_lines = [
        'Checkout event notification',
        '---------------------------',
        'Event type: ' . $event_type,
        'Payment status: ' . ($payment_status ?: 'n/a'),
        'Package code: ' . ($package_code ?: 'n/a'),
        'Billing cycle: ' . ($billing_cycle ?: 'n/a'),
        'Checkout URL: ' . ($checkout_url ?: 'n/a'),
        'Timestamp (UTC): ' . gmdate('Y-m-d H:i:s'),
        'Metadata: ' . $metadata,
    ];

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: VOGO Checkout <no-reply@vogo.me>',
    ];

    $sent = wp_mail('adrian@vogo.family', $subject, implode("\n", $body_lines), $headers);

    if ($sent) {
        wp_send_json_success(['sent' => true]);
    }

    wp_send_json_error(['sent' => false], 500);
}
